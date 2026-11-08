$ErrorActionPreference = 'Stop'

$projectPath = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$repositoryPath = [IO.Path]::GetFullPath((Join-Path $projectPath '..'))
$gitRoot = (git -C $repositoryPath rev-parse --show-toplevel).Trim()
if ($LASTEXITCODE -ne 0 -or [IO.Path]::GetFullPath($gitRoot) -ne $repositoryPath) { throw 'Unerwarteter Repository-Pfad.' }
$branch = (git -C $repositoryPath branch --show-current).Trim()
if ($branch -ne 'feature/website-rework') { throw 'Nur im Branch feature/website-rework ausfuehren.' }
$savedCommit = (git -C $repositoryPath rev-parse HEAD).Trim()
$savedMessage = (git -C $repositoryPath log -1 --format=%s).Trim()
if ($savedMessage -ne 'Website-Rework vor Umstrukturierung sichern') { throw 'Unerwarteter Sicherungsstand. Vor Ausfuehrung pruefen.' }
$tags = @(git -C $repositoryPath tag --list 'website-vor-rework-*')
if ($tags.Count -eq 0) { throw 'Sicherungstag fehlt.' }

foreach ($file in @('CNAME', 'robots.txt', 'sitemap.xml', 'favicon.ico', 'impressum.html', 'datenschutz.html')) {
    if (!(Test-Path -LiteralPath (Join-Path $projectPath "dist/$file"))) { throw "Build-Datei fehlt: $file" }
}
if (!(Test-Path -LiteralPath (Join-Path $projectPath 'dist/index.html'))) { throw 'Build fehlt.' }

# Ausschliesslich diese bekannten alten Dateien werden entfernt.
$legacy = @('index.html', 'impressum.html', 'datenschutz.html', 'favicon.ico', 'robots.txt', 'sitemap.xml', 'cookie-banner.css', 'cookie-banner.js', 'css/style.css', 'css/responsive.css', 'css/cookie-banner.css', 'js/script.js', 'js/analytics.js', 'js/consent.js', 'js/cookie-banner.js')
foreach ($relative in $legacy) {
    $target = [IO.Path]::GetFullPath((Join-Path $repositoryPath $relative))
    if (!$target.StartsWith($repositoryPath + [IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase)) { throw 'Pfad ausserhalb des Repositories.' }
    if (Test-Path -LiteralPath $target) {
        if ((Get-Item -LiteralPath $target).PSIsContainer) { throw "Datei erwartet: $target" }
        git -C $repositoryPath diff --quiet HEAD -- $relative
        if ($LASTEXITCODE -ne 0) { throw "Alte Datei hat ungesicherte Aenderungen: $relative" }
    }
}

$workflowDirectory = Join-Path $repositoryPath '.github/workflows'
$workflowTarget = Join-Path $workflowDirectory 'pages.yml'
if (Test-Path -LiteralPath $workflowTarget) { throw 'Workflow existiert bereits. Nicht ueberschrieben.' }
New-Item -ItemType Directory -Path $workflowDirectory -Force | Out-Null
Copy-Item -LiteralPath (Join-Path $PSScriptRoot 'pages.yml') -Destination $workflowTarget
foreach ($relative in $legacy) {
    $target = [IO.Path]::GetFullPath((Join-Path $repositoryPath $relative))
    if (Test-Path -LiteralPath $target) { Remove-Item -LiteralPath $target }
}
Write-Output "Repository vorbereitet. Branch: $branch. Sicherungscommit: $savedCommit"
Write-Output 'Keine Commits, Merges oder Pushes ausgefuehrt. CNAME und asn-neu bleiben erhalten.'

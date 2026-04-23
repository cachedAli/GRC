param(
    [Parameter(Mandatory = $true, Position = 0)]
    [string]$HtmlPath,

    [Parameter(Mandatory = $false, Position = 1)]
    [string]$PdfPath,

    [Parameter(Mandatory = $false)]
    [string]$ChromePath,

    [Parameter(Mandatory = $false)]
    [switch]$OpenPdf
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

function Resolve-BrowserPath {
    param([string]$ExplicitPath)

    $candidates = New-Object System.Collections.Generic.List[string]

    if ($ExplicitPath) {
        $candidates.Add($ExplicitPath)
    }

    foreach ($candidatePath in @(
        "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
        "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
        "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe",
        "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
        "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
        "$env:LOCALAPPDATA\Microsoft\Edge\Application\msedge.exe"
    )) {
        $candidates.Add($candidatePath)
    }

    foreach ($commandName in @('chrome.exe', 'msedge.exe')) {
        $command = Get-Command $commandName -ErrorAction SilentlyContinue
        if ($command -and $command.Source) {
            $candidates.Add($command.Source)
        }
    }

    foreach ($candidate in $candidates) {
        if ($candidate -and (Test-Path -LiteralPath $candidate)) {
            return (Resolve-Path -LiteralPath $candidate).Path
        }
    }

    throw 'Could not find Chrome or Edge. Pass -ChromePath with the browser executable path.'
}

function Resolve-AbsolutePath {
    param([string]$Path)
    return (Resolve-Path -LiteralPath $Path).Path
}

if (-not (Test-Path -LiteralPath $HtmlPath)) {
    throw "HTML file not found: $HtmlPath"
}

$resolvedHtml = Resolve-AbsolutePath $HtmlPath

if (-not $PdfPath) {
    $PdfPath = [System.IO.Path]::ChangeExtension($resolvedHtml, '.pdf')
}

$pdfDirectory = Split-Path -Parent $PdfPath
if ($pdfDirectory -and -not (Test-Path -LiteralPath $pdfDirectory)) {
    New-Item -ItemType Directory -Path $pdfDirectory | Out-Null
}

$resolvedBrowser = Resolve-BrowserPath $ChromePath
$htmlUri = ([System.Uri]::new($resolvedHtml)).AbsoluteUri

$chromeArgs = @(
    '--headless=new'
    '--disable-gpu'
    '--allow-file-access-from-files'
    '--no-pdf-header-footer'
    '--virtual-time-budget=8000'
    "--print-to-pdf=$PdfPath"
    $htmlUri
)

& $resolvedBrowser @chromeArgs

if ($LASTEXITCODE -ne 0) {
    throw "Browser print failed with exit code $LASTEXITCODE"
}

if ($OpenPdf) {
    Start-Process -FilePath $PdfPath
}

Write-Host "Created PDF: $PdfPath"
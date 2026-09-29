$ErrorActionPreference = 'Stop'
$previewUrl = 'http://127.0.0.1:4173'
$previewRoot = $PSScriptRoot
$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
if (-not $nodeCommand) { throw 'Node.js is required. Install Node.js 22.13 or newer.' }
$previewCli = Join-Path $previewRoot 'node_modules\next\dist\bin\next'
if (-not (Test-Path -LiteralPath $previewCli)) { throw 'Dependencies missing. Run npm ci and npm run build in this folder first.' }
function Get-CynthiaPreview {
    try { return Invoke-WebRequest -Uri $previewUrl -UseBasicParsing -TimeoutSec 2 }
    catch { return $null }
}
$previewResponse = Get-CynthiaPreview
if ($previewResponse -and -not $previewResponse.Content.Contains('/images/cynthia/astronaut.png')) {
    throw 'Port 4173 is being used by another website. Close that server or choose a different port.'
}
if (-not $previewResponse) {
    $buildId = Join-Path $previewRoot '.next\BUILD_ID'
    if (-not (Test-Path -LiteralPath $buildId)) { throw 'Build missing. Run npm run build first.' }
    $logRoot = Join-Path $previewRoot '.preview'
    New-Item -ItemType Directory -Path $logRoot -Force | Out-Null
    $previewProcess = Start-Process -FilePath $nodeCommand.Source -WorkingDirectory $previewRoot -ArgumentList @('node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','4173') -WindowStyle Hidden -RedirectStandardOutput (Join-Path $logRoot 'server.log') -RedirectStandardError (Join-Path $logRoot 'server-error.log') -PassThru
    $previewProcess.Id | Set-Content -LiteralPath (Join-Path $logRoot 'server.pid')
    for ($attempt=0; $attempt -lt 30; $attempt++) {
        Start-Sleep -Milliseconds 500
        $previewResponse = Get-CynthiaPreview
        if ($previewResponse) { break }
    }
}
if (-not $previewResponse -or -not $previewResponse.Content.Contains('/images/cynthia/astronaut.png')) { throw 'Preview did not become ready. Check .preview/server-error.log.' }
Start-Process $previewUrl
Write-Output "Cynthia preview: $previewUrl"

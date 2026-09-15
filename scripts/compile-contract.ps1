$ErrorActionPreference = 'Stop'
$workspace = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..')).Path
$wslWorkspace = (wsl.exe -d Ubuntu -e wslpath -a $workspace).Trim()
if (-not $wslWorkspace) {
  throw 'Could not translate the workspace path for WSL.'
}
wsl.exe -d Ubuntu -e bash -lc "export PATH=/home/nikku/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin; cd '$wslWorkspace'; compact compile +0.31.1 contract/src/zkescrow.compact contract/src/managed/zkescrow"
if ($LASTEXITCODE -ne 0) {
  throw "Compact compilation failed with exit code $LASTEXITCODE."
}


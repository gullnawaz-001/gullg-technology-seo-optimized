$targetZip = "d:\WEB-WORK\Gullgtech-web\15-08-2026\gullgtech-antigravity\gullg-technology-seo-optimized.zip"
if (Test-Path $targetZip) {
    Remove-Item $targetZip -Force
}

$items = Get-ChildItem -Path "d:\WEB-WORK\Gullgtech-web\15-08-2026\gullgtech-antigravity" | Where-Object {
    $_.Name -ne "node_modules" -and
    $_.Name -ne ".git" -and
    $_.Extension -ne ".zip"
}

Compress-Archive -Path $items.FullName -DestinationPath $targetZip -CompressionLevel Optimal

if (Test-Path $targetZip) {
    $zipItem = Get-Item $targetZip
    Write-Host "SUCCESS: $($zipItem.FullName) created with size $($zipItem.Length) bytes"
} else {
    Write-Error "Failed to create zip"
}

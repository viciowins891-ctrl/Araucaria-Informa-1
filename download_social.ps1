$url = "https://images.unsplash.com/photo-1551194368-2c938c64de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
$output = "public/images/araucaria_social_share_v1.jpg"
try {
    Invoke-WebRequest -Uri $url -OutFile $output -UserAgent "Mozilla/5.0"
    Write-Host "Download success"
}
catch {
    Write-Host "Download failed: $_"
}

$images = @{
    "iptu_payment_guide_internal.jpg" = "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    "araucaria_volei_celebration_internal.jpg" = "https://images.unsplash.com/photo-1592656094267-764a45160066?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    "healthy_cooking_course_internal.jpg" = "https://images.unsplash.com/photo-1507048331197-7d4ac239e119?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    "photography_contest_camera_internal.jpg" = "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    "ubs_health_center_night_internal.jpg" = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    "festa_junina_school_internal.jpg" = "https://images.unsplash.com/photo-1561578917-472191842388?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    "pioneers_homage_ceremony_internal.jpg" = "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    "school_games_torch_internal.jpg" = "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
}

foreach ($key in $images.Keys) {
    try {
        $url = $images[$key]
        $output = "public/images/$key"
        Write-Host "Downloading $key from $url..."
        Invoke-WebRequest -Uri $url -OutFile $output -UserAgent "Mozilla/5.0" -UseBasicParsing
        Write-Host "Success."
    } catch {
        Write-Host "Error downloading $key : $_"
    }
}

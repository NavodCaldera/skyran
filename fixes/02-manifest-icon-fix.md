# Fix for Manifest Icon Error

## Issue
The `manifest.json` file references `logo192.png` and `logo512.png`, but these files don't exist in the public directory. Only `logo.png` exists.

## Fix Implementation

### Option A: Update the manifest.json to use existing logo

This is the recommended approach as it's simpler and doesn't require creating new assets.

#### Changes to `frontend/public/manifest.json`:

Update the manifest.json file to reference the existing logo.png file:

```json
{
  "short_name": "Skyran",
  "name": "Skyran Financial Platform",
  "icons": [
    {
      "src": "logo.png",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/png"
    },
    {
      "src": "logo.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#0A192F",
  "background_color": "#0A192F"
}
```

### Alternative Option B: Create the missing icon files

If you prefer to maintain the original manifest structure, you could create the missing icon files:

1. Create `logo192.png` (192x192 pixels) based on the existing `logo.png`
2. Create `logo512.png` (512x512 pixels) based on the existing `logo.png`

This would require image editing software to resize the existing logo.

## Testing
After making these changes, the console error related to the manifest icon should be resolved.
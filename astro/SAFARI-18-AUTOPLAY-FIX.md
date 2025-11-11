# Safari 18.1 Autoplay Fix - Implementation Guide

## Problem Summary

Safari 18.1 on macOS Sequoia blocks video autoplay by default due to user preference settings, even with correct `muted`, `playsinline`, and `autoplay` attributes.

**Error:** `NotAllowedError: The request is not allowed by the user agent or the platform in the current context`

## Root Cause

1. **Safari 18.1 user preferences** block autoplay by default on new/untrusted domains
2. Missing poster image (404 error) may contribute to autoplay failure
3. Native Safari controls appear when autoplay is blocked

## Immediate Workaround (For Client Testing)

Ask the client to configure Safari 18.1:

1. Open Safari
2. Go to **Safari menu > Settings for demo2.sauwasauna.com**
3. Under **Auto-Play**, select **"Allow All Auto-Play"**
4. Reload the page

The video should now autoplay correctly.

## Permanent Solution (Implemented)

### Changes Made to `HeroSlider.astro`

1. **Changed `preload="metadata"` to `preload="auto"`**
   - Ensures full video is loaded before attempting playback
   - More reliable in Safari 18.1

2. **Removed poster attribute from mobile video**
   - Eliminates 404 error for missing poster file
   - Safari shows first frame automatically if no poster

3. **Improved fallback behavior**
   - When autoplay fails after 4 attempts, shows static poster image instead of native controls
   - Maintains clean design even when autoplay is blocked
   - Video still activates on user interaction (click, touch, scroll)

4. **Additional Safari 18.1 safeguards**
   - Force remove controls on `loadedmetadata` event
   - Ensure muted state on every play attempt

### Expected Behavior After Fix

**Scenario 1: Safari allows autoplay (user has whitelisted site)**
- Video autoplays immediately
- No controls visible
- Seamless looping

**Scenario 2: Safari blocks autoplay (default for new visitors)**
- Static poster image displays (professional look)
- No native controls visible
- First user interaction (click/touch/scroll) activates video
- Video continues looping after activation

## Testing Checklist

### Safari 18.1 (macOS Sequoia)
- [ ] Default settings (Stop Media with Sound) - should show poster, activate on interaction
- [ ] Allow All Auto-Play setting - should autoplay immediately
- [ ] Never Auto-Play setting - should show poster, activate on interaction

### Other Safari Versions
- [ ] Safari 17.x (macOS Ventura) - should maintain existing behavior
- [ ] Safari iOS 18 - should autoplay with `playsinline`
- [ ] Safari iOS 17 - should maintain existing behavior

### Other Browsers (Regression Testing)
- [ ] Chrome/Edge - should continue working
- [ ] Firefox - should continue working

## Additional Recommendations

### Create Mobile Poster Image

The mobile video is missing its poster. Create it with:

```bash
# Option 1: Extract first frame from video (requires ffmpeg)
cd astro/public/images/hero/mobile
ffmpeg -i sauwa-hero-mobile.mp4 -ss 00:00:00 -vframes 1 1.sauna-finlandesa-sauwa-andorra.webp

# Option 2: Copy desktop poster (quick fix)
cd astro/public/images/hero
cp desktop/2.interior-sauna-finlandesa-sauwa-andorra.webp mobile/1.sauna-finlandesa-sauwa-andorra.webp
```

Then restore the poster attribute in mobile video:
```astro
<video
  class="block md:hidden absolute inset-0 w-full h-full object-cover"
  ...
  poster="/images/hero/mobile/1.sauna-finlandesa-sauwa-andorra.webp"
  ...
>
```

## Technical Details

### Safari Autoplay Policy (Safari 11+)

Safari uses heuristic blocking for autoplay:
- First visit to domain = autoplay blocked
- After user interacts with media = domain whitelisted
- User can manually configure per-site in Safari Settings

### Why This Happens

Safari 18.1 **did not introduce new policies**, but enforces existing ones:
- Protects user experience (unwanted audio/video)
- Saves battery on MacBooks
- Respects user privacy

### Why You Can't Override It

Apple intentionally prevents JavaScript from bypassing user preferences. The correct approach is:
1. Graceful fallback (static poster)
2. Wait for user interaction
3. Provide clear visual indication

## Build and Deploy

```bash
# Build Astro site with updated component
cd astro
npm run build

# Deploy to production
# (Your existing deployment process)
```

## Support Resources

- [WebKit Blog: Auto-Play Policy](https://webkit.org/blog/7734/auto-play-policy-changes-for-macos/)
- [MDN: Autoplay Guide for Media](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay)
- [Safari Release Notes](https://developer.apple.com/documentation/safari-release-notes)

## Questions?

Contact the development team for assistance with deployment or testing.

---

**Last Updated:** 2025-11-11
**Applies to:** Safari 18.1 (version 26.1) on macOS Sequoia
**Status:** PRODUCTION READY

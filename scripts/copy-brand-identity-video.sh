#!/usr/bin/env bash
# Run this on your Mac (from project root) so Solution 2 can play your screen recording.
# Cursor’s environment cannot read macOS TemporaryItems, so you copy the file locally.

set -e
DEST="$(cd "$(dirname "$0")/.." && pwd)/public/videos/work/community-health-media/brand-identity-walkthrough.mov"

if [[ -z "$1" ]]; then
  echo "Usage: ./scripts/copy-brand-identity-video.sh \"/path/to/Screen Recording ….mov\""
  echo ""
  echo "Example (paste your actual path from Finder / terminal):"
  echo '  ./scripts/copy-brand-identity-video.sh "/var/folders/.../Screen Recording 2026-03-19 at 4.06.40 PM.mov"'
  exit 1
fi

cp "$1" "$DEST"
echo "Copied to: $DEST"
ls -la "$DEST"

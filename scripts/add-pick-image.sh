#!/usr/bin/env bash
# Turn a product photo into a transparent flat for the Current Favs section.
#
#   scripts/add-pick-image.sh <pick-id> <image-url-or-path>
#
# Lifts the product off its background with macOS Vision (same as Photos'
# "lift subject"), crops to it, and writes public/picks/<pick-id>.webp.
# Needs macOS 14+, Xcode command line tools, and `brew install webp`.
set -euo pipefail

id="${1:?pick id}"
src="${2:?image url or path}"
root="$(cd "$(dirname "$0")/.." && pwd)"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

if [[ "$src" =~ ^https?:// ]]; then
  curl -sSL -m 60 "$src" -o "$tmp/in"
else
  cp "$src" "$tmp/in"
fi

swiftc -O "$root/scripts/cutout.swift" -o "$tmp/cutout"
"$tmp/cutout" "$tmp/in" "$tmp/cut.png"
sips -Z 900 "$tmp/cut.png" --out "$tmp/cut-900.png" >/dev/null

mkdir -p "$root/public/picks"
cwebp -q 82 -alpha_q 90 -quiet "$tmp/cut-900.png" -o "$root/public/picks/$id.webp"
echo "wrote public/picks/$id.webp"

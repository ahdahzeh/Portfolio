#!/usr/bin/env node
/**
 * Trim N seconds off the end of a video (stream copy when possible).
 * Usage: node scripts/trim-video-end.mjs <file> [secondsToTrim]
 */
import { execFileSync } from 'node:child_process';
import { existsSync, renameSync, unlinkSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';

const require = createRequire(import.meta.url);
const ffmpegPath = require('ffmpeg-static');
const ffprobePath = require('ffprobe-static').path;

const file = resolve(process.argv[2] ?? '');
const trimEnd = Number(process.argv[3] ?? '5');

if (!file || !existsSync(file)) {
  console.error('Usage: node scripts/trim-video-end.mjs <path-to-video> [secondsToTrim]');
  process.exit(1);
}

if (!Number.isFinite(trimEnd) || trimEnd <= 0) {
  console.error('secondsToTrim must be a positive number');
  process.exit(1);
}

const json = execFileSync(
  ffprobePath,
  ['-v', 'error', '-show_entries', 'format=duration', '-of', 'json', file],
  { encoding: 'utf8' }
);
const duration = Number(JSON.parse(json).format?.duration);
if (!Number.isFinite(duration) || duration <= trimEnd) {
  console.error(`Invalid duration ${duration} or shorter than trim (${trimEnd}s)`);
  process.exit(1);
}

const newDuration = duration - trimEnd;
const out = `${file}.trimmed.mov`;
const bak = `${file}.bak`;

console.log(`Duration ${duration.toFixed(3)}s → keep ${newDuration.toFixed(3)}s (trim last ${trimEnd}s)`);

try {
  execFileSync(
    ffmpegPath,
    ['-y', '-i', file, '-t', String(newDuration), '-c', 'copy', out],
    { stdio: 'inherit' }
  );
} catch {
  console.log('Stream copy failed, re-encoding with libx264 + aac…');
  execFileSync(
    ffmpegPath,
    [
      '-y',
      '-i',
      file,
      '-t',
      String(newDuration),
      '-c:v',
      'libx264',
      '-preset',
      'fast',
      '-crf',
      '20',
      '-c:a',
      'aac',
      '-b:a',
      '192k',
      out,
    ],
    { stdio: 'inherit' }
  );
}

renameSync(file, bak);
renameSync(out, file);
unlinkSync(bak);
console.log('Done:', file);

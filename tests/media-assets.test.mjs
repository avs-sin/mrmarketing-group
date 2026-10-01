import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import path from 'node:path'

const manifestPath = 'src/assets/data/media-manifest.json'

const load = () => {
  assert.ok(existsSync(manifestPath), 'Selected media manifest must exist')

  return JSON.parse(readFileSync(manifestPath, 'utf8'))
}

const local = src => path.join('public', src)

test('selected_assets_are_small_and_readable', () => {
  const assets = load()

  assert.equal(assets.length, 8)

  for (const asset of assets) {
    assert.ok(existsSync(local(asset.src)), asset.src)
    assert.ok(statSync(local(asset.src)).size <= (asset.kind === 'video' ? 12 * 1024 * 1024 : 300 * 1024), asset.src)

    if (asset.kind === 'video') {
      assert.ok(statSync(local(asset.poster)).size <= 150 * 1024, asset.poster)
      assert.match(readFileSync(local(asset.captions), 'utf8'), /^WEBVTT\n/)
      assert.match(readFileSync(local(asset.captions), 'utf8'), /\d{2}:\d{2}:\d{2}\.\d{3} -->/)
    }
  }

  for (const width of [640, 960, 1440]) {
    assert.ok(statSync(`public/images/mrmg/refined/founder-${width}.webp`).size <= 300 * 1024)
  }
})

test('portrait_videos_keep_their_frame', () => {
  for (const asset of load().filter(a => a.kind === 'video')) {
    const meta = JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-show_streams', '-of', 'json', local(asset.src)], { encoding: 'utf8' }))
    const video = meta.streams.find(s => s.codec_type === 'video')

    assert.equal(video.width, 720)
    assert.equal(video.height, 1280)
    assert.equal(video.codec_name, 'h264')
    assert.ok(meta.streams.some(s => s.codec_type === 'audio'))
  }
})

test('duplicate_originals_are_not_published', () => {
  const hashes = load().map(a => a.sourceSha256)

  assert.equal(new Set(hashes).size, hashes.length)
})

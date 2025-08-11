import { merge_ping_options, get_timestamp } from './utils.ts';

function testMergePingOptions() {
  const customOptions = { timeoutMs: 500, retries: 3 };
  const merged = merge_ping_options(customOptions);
  console.log('mergePingOptions resultado:', merged);
}

function testGetTimestamp() {
  const timestamp = get_timestamp();
  console.log('getTimestamp resultado:', timestamp);
}

testMergePingOptions();
testGetTimestamp();

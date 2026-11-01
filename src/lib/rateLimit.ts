/** Download rate limiting removed — unlimited free downloads, no sign-in required. */

/** Always returns true — unlimited free downloads, no sign-in required. */
export function tryConsumeDownloadToken(): boolean {
  return true;
}

export function getUsage(): { downloadsToday: number; remainingToday: number; bucketFull: boolean; signedIn: boolean } {
  return {
    downloadsToday: 0,
    remainingToday: Infinity,
    bucketFull: true,
    signedIn: false,
  };
}

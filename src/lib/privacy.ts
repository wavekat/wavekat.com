/**
 * The single source of truth for the privacy policy's "last updated" line and
 * its WebPage schema's dateModified, on all nine locale pages — the policy is
 * one document said nine times, so it carries one date. Change it whenever any
 * locale's policy text changes.
 *
 * Also published at /legal.json, which is how wavekat-platform checks that the
 * version it records at sign-up names a date this page actually shows.
 */
export const PRIVACY_UPDATED = new Date('2026-09-12');

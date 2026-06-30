-- Make the documents bucket private and remove the broad public read policy.
-- Applied to project afeaatpzvpdlttqyspdd on 2026-06-30.
--
-- Files were previously world-readable and listable. They are now served only
-- via short-lived signed URLs created server-side by the authenticated
-- /api/documents/[...path] route (service-role) after a member tier check.
update storage.buckets set public = false where id = 'documents';

drop policy if exists "Public read access" on storage.objects;

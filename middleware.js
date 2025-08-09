
import { next } from '@vercel/edge';

export const config = {
  matcher: '/*',
};

export default async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Check if the .maintenance file exists
  const maintenanceMode = await fetch(new URL('/.maintenance', req.url))
    .then((res) => res.ok)
    .catch(() => false);

  if (maintenanceMode) {
    // If in maintenance mode, rewrite to the maintenance page
    req.nextUrl.pathname = `/maintenance.html`;
    return Response.rewrite(req.nextUrl);
  }

  return next();
}

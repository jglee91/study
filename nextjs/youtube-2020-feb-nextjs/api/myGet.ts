import { NextPageContext } from 'next';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';

export async function myGet(url: string, ctx: NextPageContext) {
  const cookie = ctx.req?.headers.cookie;
  const response = await fetch(url, {
    headers: {
      cookie: cookie!,
    },
  });

  switch (response.status) {
    case 401:
      if (ctx.req) {
        ctx.res.writeHead(302, {
          Location: 'http://localhost:3000/login',
        });
        ctx.res?.end();
      } else {
        Router.replace('/login');
        return {};
      }
      break;
    default:
      return await response.json();
  }
}

import { Elysia, t } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";
// @ts-expect-error
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";

console.log(baremuxPath);
import { log } from "./utils";
const goodCodes = ["illyria", "math"];
const goodCodeHashes = goodCodes.map((code) => encodeCode(code));
const proxyFile = Bun.file("src/proxy.html");

const server = new Elysia()
  .use(
    staticPlugin({
      assets: "public",
      prefix: "/",
      noCache: true,
    })
  )
  .use(staticPlugin({ assets: baremuxPath, prefix: "/baremux" }))
  .use(staticPlugin({ assets: epoxyPath, prefix: "/ep" }))
  .post(
    "/api/matchmaker/find-info-from-code",
    async ({ body, cookie: { code }, response }) => {
      if (!body.code) return new Response("No code provided", { status: 400 });
      if (goodCodes.includes(body.code)) {
        console.log("good code");
        code.value = encodeCode(body.code);
        // 1 week
        code.maxAge = 60 * 60 * 24 * 7;
        return true;
      } else {
        return new Response("Invalid code", { status: 400 });
      }
    },
    {
      body: t.Object({
        code: t.Optional(t.String()),
      }),
    }
  )
  .get("/api/info", async () => {
    return Response.redirect("https://discord.gg/Dpj8C8SAmH");
  })
  .get("/instance", async ({ cookie: { code } }) => {
    // if (code.value !== encodeCode(goodCode)) {
    //   return Response.redirect("/");
    // }
    if (!code.value) {
      console.log("no code");
      return Response.redirect("/");
    }
    if (!goodCodeHashes.includes(code.value)) {
      console.log(`bad code ${code.value}`);
      return Response.redirect("/");
    }

    return new Response(proxyFile);
  })
  .listen(parseInt(process.env.PORT ?? "8080"));

log.info(`Server running at ${server.server?.url}`);

function encodeCode(code: string): string {
  return new Bun.CryptoHasher("sha1").update(code).digest("hex");
}

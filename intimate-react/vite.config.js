import { createRequire } from "node:module";
import process from "node:process";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

const require = createRequire(import.meta.url);
const sendOrderEmail = require("../api/send-order-email.js");

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => {
      if (!raw) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

function createJsonResponse(res) {
  return {
    setHeader(name, value) {
      res.setHeader(name, value);
    },
    status(code) {
      res.statusCode = code;
      return this;
    },
    json(payload) {
      if (!res.headersSent) {
        res.setHeader("Content-Type", "application/json");
      }
      res.end(JSON.stringify(payload));
    },
  };
}

function orderEmailDevApi() {
  return {
    name: "order-email-dev-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url !== "/api/send-order-email") {
          next();
          return;
        }

        try {
          req.body = await readRequestBody(req);
          await sendOrderEmail(req, createJsonResponse(res));
        } catch (error) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              error: error.message || "Order email could not be sent.",
            }),
          );
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const siteBase = env.VITE_SITE_BASE || "/";
  [
    "RESEND_API_KEY",
    "ORDER_EMAIL_FROM",
    "ORDER_EMAIL_REPLY_TO",
    "ORDER_EMAIL_BCC",
    "SITE_URL",
    "SUPABASE_URL",
    "SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "VITE_SUPABASE_URL",
    "VITE_SUPABASE_PUBLISHABLE_KEY",
  ].forEach((key) => {
    if (env[key] && !process.env[key]) {
      process.env[key] = env[key];
    }
  });

  return {
    base: siteBase,
    plugins: [orderEmailDevApi(), react(), tailwindcss()],
  };
});

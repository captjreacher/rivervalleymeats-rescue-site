import { serve } from "https://deno.land/std/http/server.ts";

serve(async (req) => {

  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {

    const body = await req.json();

    const resendResponse = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "onboarding@resend.dev",
          to: Deno.env.get("CONTACT_TO_EMAIL"),
          subject: "River Valley Meats Website Enquiry",
          html: `
            <h2>New Website Enquiry</h2>

            <p><strong>Name:</strong> ${body.name}</p>

            <p><strong>Email:</strong> ${body.email}</p>

            <p><strong>Phone:</strong> ${body.phone}</p>

            <p><strong>Message:</strong></p>

            <p>${body.message}</p>
          `,
        }),
      }
    );

    const resendData = await resendResponse.json();

    return new Response(
      JSON.stringify(resendData),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

  } catch (err) {

    return new Response(
      JSON.stringify({
        error: err.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

  }

});
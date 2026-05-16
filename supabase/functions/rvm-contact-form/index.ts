import { serve } from "https://deno.land/std/http/server.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  <form id="contactForm">
  <input type="text" id="name" placeholder="Your name" required style="width:100%;padding:10px;margin-bottom:10px;">

  <input type="email" id="email" placeholder="Your email" required style="width:100%;padding:10px;margin-bottom:10px;">

  <input type="tel" id="phone" placeholder="Your phone" style="width:100%;padding:10px;margin-bottom:10px;">

  <textarea id="message" placeholder="Message" required style="width:100%;padding:10px;height:120px;"></textarea>

  <br><br>

  <button class="button" type="submit">Send Message</button>

  <p id="formStatus" style="margin-top:15px;"></p>
</form>

<script>
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const status = document.getElementById("formStatus");

  const payload = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    message: document.getElementById("message").value,
  };

  status.innerText = "Sending...";

  try {
    const response = await fetch(
      "https://jqfodlzcsgfocyuawzyx.supabase.co/functions/v1/rvm-contact-form",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (response.ok) {
      status.innerText = "Message sent successfully.";
      document.getElementById("contactForm").reset();
    } else {
      status.innerText = "There was an issue sending the message.";
    }
  } catch (err) {
    status.innerText = "Network error. Please try again.";
  }
});
</script>

    const resendData = await resendResponse.json();

    return new Response(JSON.stringify(resendData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
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
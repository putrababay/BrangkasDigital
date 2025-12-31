export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        // API untuk ambil data
        if (url.pathname === "/api/accounts" && request.method === "GET") {
            const { results } = await env.DB.prepare("SELECT * FROM accounts").all();
            return new Response(JSON.stringify(results), { headers: { "Content-Type": "application/json" } });
        }

        // API untuk simpan data
        if (url.pathname === "/api/accounts" && request.method === "POST") {
            const data = await request.json();
            await env.DB.prepare(
                "INSERT INTO accounts (kategori, username, password, pin, pola, riwayat) VALUES (?, ?, ?, ?, ?, ?)"
            ).bind(data.kategori, data.username, data.password, data.pin, data.pola, data.riwayat).run();
            return new Response("Success", { status: 200 });
        }

        // Default: Sajikan file statis (index.html)
        return env.ASSETS.fetch(request);
    }
};
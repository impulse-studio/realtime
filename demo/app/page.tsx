import LikeButton from "@/components/like-button";
import { getRedis } from "@/lib/redis";
import { incrementLikesAction } from "./actions";
import {
  codeExampleToJsx,
  dockerCommand,
  dockerImage,
  gs1Code,
  gs2Code,
  gs2Command,
  gs3Code,
  gs3Command,
  pushAuthCode,
  subscribeAuthCode,
  typeSafeCodeExample,
} from "./code-examples";
import RoundCarousel from "@/components/round-carousel";
import Serverless from "@/components/serverless";
import ConfigFunc from "@/components/config-func";
import Command from "@/components/command";
import DockerIcon from "@/components/docker-icon";
import { Terminal } from "lucide-react";
import Accordion from "@/components/accordion";
import { RiDiscordFill, RiGithubFill } from "@remixicon/react";
import Link from "next/link";

export default async function HomePage() {
  const redis = getRedis();
  const initialCount = Number(await redis.get("demo:likes")) || 0;

  return (
    <main className="border-x border-gray-700 min-h-screen mx-auto w-[90vw] max-w-4xl pt-[10vh]">
      <hr className="absolute left-0 right-0 border-gray-700" />
      <header className="flex flex-col gap-4 items-center text-center justify-center h-[80vh]">
        <h1 className="text-5xl font-bold leading-tight">
          Type-safe live updates <br />
          in minutes
        </h1>
        <p className="text-lg text-gray-500">
          Zero-config SSE. Shared types. Simple client & server helpers.
        </p>

        <LikeButton initialCount={initialCount} onLike={incrementLikesAction} />
      </header>

      <hr className="absolute left-0 right-0 border-gray-700" />
      <h2 className="sr-only">Features</h2>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-x divide-y divide-gray-700 -me-px border-b border-gray-700">
        <div className="md:col-span-2 p-4 overflow-hidden flex flex-col gap-2">
          <h3 className="text-2xl font-bold">Type-safe</h3>
          <p className="text-gray-500 mb-2">
            Define your channels and payload once and share it between client
            and server.
          </p>
          <pre className="bg-gray-900 p-4 rounded-t-2xl -mb-4 overflow-x-auto">
            <code className="bg-none p-0 font-normal">
              {codeExampleToJsx(typeSafeCodeExample)}
            </code>
          </pre>
        </div>
        <div className="md:col-span-1 p-4 flex flex-col gap-2">
          <h3 className="text-2xl font-bold">Framework agnostic</h3>
          <p className="text-gray-500">Works with any framework.</p>
          <RoundCarousel />
        </div>
        <div className="md:col-span-1 p-4 flex flex-col gap-2">
          <h3 className="text-2xl font-bold">Zero-config</h3>
          <p className="text-gray-500">
            Implement realtime with ease, and a few lines of code.
          </p>

          <ConfigFunc />
        </div>
        <div className="md:col-span-2 p-4 flex flex-col gap-2">
          <h3 className="text-2xl font-bold">Self-hostable broker</h3>
          <p className="text-gray-500">
            Tiny Node service with in-memory broker, no external infra
            (Redis/Kafka) required to get started.
          </p>

          <Command
            displayText={dockerImage}
            copyText={dockerCommand}
            icon={<DockerIcon />}
          />
        </div>
        <div className="md:col-span-2 lg:col-span-3 p-4 flex flex-col md:flex-row gap-4">
          <div className="flex flex-col gap-2 max-w-xs">
            <h3 className="text-2xl font-bold">Serverless-friendly</h3>
            <p className="text-gray-500">
              Push via stateless HTTP POST from any environment (serverless,
              edge, cron), no persistent connections needed server-side.
            </p>
          </div>
          <Serverless />
        </div>
      </section>

      <h2 className="text-4xl font-bold mt-32 mb-8 w-full text-center">
        Let's get started!
      </h2>
      <hr className="absolute left-0 right-0 border-gray-700" />

      <section className="flex flex-col">
        <div className="px-4 py-8 flex flex-col gap-4 border-b border-gray-700">
          <h3 className="text-xl font-mono text-gray-300">
            1. Define your channels and payload
          </h3>
          <pre className="bg-gray-900 p-4 rounded-2xl overflow-x-auto">
            <code className="bg-none p-0 font-normal">
              {codeExampleToJsx(gs1Code)}
            </code>
          </pre>
        </div>

        <div className="px-4 py-8 flex flex-col gap-4 border-b border-gray-700">
          <h3 className="text-xl font-mono text-gray-300">
            2. Subscribe on your client
          </h3>
          <p className="text-gray-400">First let's install the package</p>
          <Command
            displayText={gs2Command}
            copyText={gs2Command}
            icon={<Terminal />}
          />

          <p className="text-gray-400 mt-2">
            And use the `subscribe` function to listen for events on your
            client.
          </p>
          <pre className="bg-gray-900 p-4 rounded-2xl overflow-x-auto">
            <code className="bg-none p-0 font-normal">
              {codeExampleToJsx(gs2Code)}
            </code>
          </pre>
        </div>

        <div className="px-4 py-8 flex flex-col gap-4 border-b border-gray-700">
          <h3 className="text-xl font-mono text-gray-300">
            3. Push from your server
          </h3>
          <p className="text-gray-400">Then start a local service</p>
          <Command
            displayText={gs3Command}
            copyText={gs3Command}
            icon={<Terminal />}
          />

          <p className="text-gray-400 mt-2">
            And use the `push` function to send events to your clients through
            the service.
          </p>
          <pre className="bg-gray-900 p-4 rounded-2xl overflow-x-auto">
            <code className="bg-none p-0 font-normal">
              {codeExampleToJsx(gs3Code)}
            </code>
          </pre>
        </div>

        <div className="px-4 py-8 flex flex-col gap-4 border-b border-gray-700">
          <h3 className="text-xl font-mono text-gray-300">4. You're done</h3>
          <p className="text-gray-400">
            Perfect! You're now free to add more events to your app.
          </p>
          <p className="text-gray-400">
            You may want more customizations, like authentication or topics.
            <br />
            Follow the link below to learn more.
          </p>
        </div>
      </section>

      <h2 className="text-4xl font-bold mt-32 mb-8 w-full text-center">
        Deep dive!
      </h2>
      <hr className="absolute left-0 right-0 border-gray-700" />

      <section className="flex flex-col">
        <Accordion title="Authentication & Topics">
          <p className="text-gray-400">
            In order to authenticate your events you can use the{" "}
            <code>token</code> option in the <code>subscribe</code> function.
            <br />
            You can also target a specific topic by using the <code>
              topic
            </code>{" "}
            option, these basically act as rooms or groups.
          </p>
          <pre className="bg-gray-900 p-4 rounded-2xl overflow-x-auto">
            <code className="bg-none p-0 font-normal">
              {codeExampleToJsx(subscribeAuthCode)}
            </code>
          </pre>

          <p className="mt-2 text-gray-400">
            On the server side, you can use the same <code>topic</code> option
            to send events to all clients subscribed to that topic.
            <br />
            For the authentication part
          </p>
          <pre className="bg-gray-900 p-4 rounded-2xl overflow-x-auto">
            <code className="bg-none p-0 font-normal">
              {codeExampleToJsx(pushAuthCode)}
            </code>
          </pre>
        </Accordion>

        <hr className="w-full border-gray-700" />

        <Accordion title="Service CLI options">
          <p className="text-gray-400">
            You can customize the service by passing options to the CLI.
          </p>
          <h4 className="mt-4 font-mono text-gray-300 bg-gray-800 px-4 py-2 rounded-2xl">
            --port &lt;number&gt;
          </h4>
          <p className="text-gray-400">The port to listen on.</p>
          <h4 className="mt-4 font-mono text-gray-300 bg-gray-800 px-4 py-2 rounded-2xl">
            --secret &lt;string&gt;
          </h4>
          <p className="text-gray-400">
            The secret to authenticate your server (must be the same as the{" "}
            <code>token</code> option in the <code>createServerClient</code>{" "}
            function).
          </p>
        </Accordion>

        <hr className="w-full border-gray-700" />

        <Accordion title="Deploy Service with Docker">
          <p className="text-gray-400">
            You can deploy the service with Docker by running the following
            command:
          </p>
          <Command
            displayText={dockerCommand}
            copyText={dockerCommand}
            icon={<DockerIcon />}
          />
          <p className="text-gray-400">
            Feel free to change the port and secret to your liking.
          </p>
        </Accordion>

        <hr className="w-full border-gray-700" />
      </section>

      <h2 className="text-4xl font-bold mt-32 mb-8 w-full text-center">
        Missing something?
      </h2>
      <hr className="absolute left-0 right-0 border-gray-700" />

      <section className="flex flex-col items-center justify-center pt-24 pb-36 gap-4">
        <p className="text-gray-400 text-center max-w-2xl">
          If you're missing something,
          <br />
          feel free to open an issue on the GitHub repository or discuss it on
          the Discord server.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/impulse-studio/realtime"
            target="_blank"
            className="bg-white text-black px-6 py-3 rounded-2xl flex items-center gap-2 font-medium hover:bg-gray-200 relative cursor-pointer"
          >
            <div className="absolute left-0.5 right-0.5 bottom-0.5 rounded-b-2xl bg-gradient-to-t pointer-events-none h-4 from-black to-transparent opacity-20" />
            <RiGithubFill />
            Open in GitHub
          </Link>
          <Link
            href="https://discord.gg/bBWXedJwWN"
            target="_blank"
            className="bg-[#5865F2] text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-medium hover:bg-[hsl(235,86%,60%)] relative cursor-pointer"
          >
            <div className="absolute left-0.5 right-0.5 bottom-0.5 rounded-b-2xl bg-gradient-to-t pointer-events-none h-4 from-black to-transparent opacity-20" />
            <RiDiscordFill />
            Open in Discord
          </Link>
        </div>
      </section>

      <hr className="absolute left-0 right-0 border-gray-700" />
      <footer className="flex items-center p-8 gap-4">
        <span className="text-gray-400 me-auto">
          Made with ❤️ by{" "}
          <Link
            href="https://impulselab.ai"
            target="_top"
            className="text-amber-600 hover:text-amber-400"
          >
            Impulse Lab
          </Link>
        </span>

        <Link
          href="https://github.com/impulse-studio/realtime"
          target="_blank"
          className="text-amber-400 hover:text-amber-600"
        >
          GitHub
        </Link>
        <Link
          href="https://discord.gg/bBWXedJwWN"
          target="_blank"
          className="text-amber-400 hover:text-amber-600"
        >
          Discord
        </Link>
        <Link
          href="https://x.com/impulselab_ai"
          target="_blank"
          className="text-amber-400 hover:text-amber-600"
        >
          X
        </Link>
        <Link
          href="https://linkedin.com/company/impulselab"
          target="_blank"
          className="text-amber-400 hover:text-amber-600"
        >
          LinkedIn
        </Link>
      </footer>
    </main>
  );
}

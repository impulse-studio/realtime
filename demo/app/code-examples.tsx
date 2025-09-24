// Take a code example and return the JSX
// example:
// #C586C0export #569CD6interface #4EC9B0RealtimeTypes
//
// and return the JSX:
// <span style={{ color: "#C586C0" }}>export </span><span style={{ color: "#569CD6" }}>interface </span><span style={{ color: "#4EC9B0" }}>RealtimeTypes</span>
export const codeExampleToJsx = (code: string) => {
  const parts = code.split(/(#[A-F0-9]{6})/);

  return parts
    .map((part, index) => {
      if (part.startsWith("#")) {
        // This is a color code, skip it and apply to next part
        return null;
      }

      // Check if previous part was a color code
      const prevPart = parts[index - 1];
      if (prevPart && prevPart.startsWith("#")) {
        const color = prevPart;
        return (
          <span key={index} style={{ color }}>
            {part}
          </span>
        );
      }

      // No color specified, return as plain text
      return <span key={index}>{part}</span>;
    })
    .filter(Boolean);
};

export const typeSafeCodeExample = `#C586C0export #569CD6interface #4EC9B0RealtimeTypes #D4D4D4{
  #CE9178'demo:likes:updated'#D4D4D4: { #9CDCFEcount#D4D4D4: #4EC9B0number #D4D4D4}
}
`;

export const gs1Code = `#C586C0export #569CD6interface #4EC9B0RealtimeTypes #D4D4D4{
  #CE9178'message'#D4D4D4: { #9CDCFEcontent#D4D4D4: #4EC9B0string #D4D4D4}
}
`;

export const gs2Command = `npm install @impulselab/realtime`;

export const gs2Code = `#C586C0import #D4D4D4{ #9CDCFEcreateRealtimeClient #D4D4D4} #C586C0from #CE9178'@impulselab/realtime'
#C586C0import type #D4D4D4{ #9CDCFERealtimeTypes #D4D4D4} #C586C0from #CE9178'./types'

#569CD6const #4FC1FFrc #D4D4D4= #DCDCAAcreateRealtimeClient#D4D4D4<#4EC9B0RealtimeTypes#D4D4D4>({
  #9CDCFEserviceUrl#D4D4D4: #CE9178'http://localhost:8080'
#D4D4D4})

#4FC1FFrc#D4D4D4.#DCDCAAsubscribe#D4D4D4(#CE9178'message'#D4D4D4, (#9CDCFEevent#D4D4D4) => {
  #9CDCFEconsole.log#D4D4D4(#9CDCFEevent#D4D4D4.#9CDCFEpayload#D4D4D4.#9CDCFEcontent#D4D4D4)
})
`;

export const gs3Command = `npx @impulselab/realtime-service`;

export const gs3Code = `#C586C0import #D4D4D4{ #9CDCFEcreateServerClient #D4D4D4} #C586C0from #CE9178'@impulselab/realtime'
#C586C0import type #D4D4D4{ #9CDCFERealtimeTypes #D4D4D4} #C586C0from #CE9178'./types'

#569CD6const #4FC1FFsc #D4D4D4= #DCDCAAcreateServerClient#D4D4D4<#4EC9B0RealtimeTypes#D4D4D4>({
  #9CDCFEserviceUrl#D4D4D4: #CE9178'http://localhost:8080'#D4D4D4,
  #9CDCFEtoken#D4D4D4: #CE9178'secret'
#D4D4D4})

#C586C0await #4FC1FFsc#D4D4D4.#DCDCAApush#D4D4D4(#CE9178'message'#D4D4D4, { #9CDCFEcontent#D4D4D4: #CE9178'Hello, world!'#D4D4D4 })
`;

export const subscribeAuthCode = `#618B50// Subscribe to a message with a secret
#C586C0rc#D4D4D4.#DCDCAAsubscribe#D4D4D4(#CE9178'message'#D4D4D4, (#9CDCFEevent#D4D4D4) => {}, { #9CDCFEtoken#D4D4D4: #CE9178'secret'#D4D4D4 })

#618B50// Or from a specific topic
#C586C0rc#D4D4D4.#DCDCAAsubscribe#D4D4D4(#CE9178'message'#D4D4D4, (#9CDCFEevent#D4D4D4) => {}, { #9CDCFEtopic#D4D4D4: #CE9178'room-42'#D4D4D4 })

#618B50// And combine both of them
#C586C0rc#D4D4D4.#DCDCAAsubscribe#D4D4D4(#CE9178'message'#D4D4D4, (#9CDCFEevent#D4D4D4) => {}, { #9CDCFEtoken#D4D4D4: #CE9178'secret'#D4D4D4, #9CDCFEtopic#D4D4D4: #CE9178'room-42'#D4D4D4 })
`;

export const pushAuthCode = `#618B50// Push a message with a secret
#C586C0await #4FC1FFsc#D4D4D4.#DCDCAApush#D4D4D4(#CE9178'message'#D4D4D4, { #9CDCFEcontent#D4D4D4: #CE9178'Hello, world!'#D4D4D4 }, { #9CDCFEtokens#D4D4D4: #CE9178'secret'#D4D4D4 })

#618B50// You can also allow multiple tokens
#C586C0await #4FC1FFsc#D4D4D4.#DCDCAApush#D4D4D4(#CE9178'message'#D4D4D4, { #9CDCFEcontent#D4D4D4: #CE9178'Hello, world!'#D4D4D4 }, { #9CDCFEtokens#D4D4D4: [#CE9178'secret'#D4D4D4, #CE9178'other'#D4D4D4]#D4D4D4 })

#618B50// Or target a topic
#C586C0await #4FC1FFsc#D4D4D4.#DCDCAApush#D4D4D4(#CE9178'message'#D4D4D4, { #9CDCFEcontent#D4D4D4: #CE9178'Hello, world!'#D4D4D4 }, { #9CDCFEtopic#D4D4D4: #CE9178'room-42'#D4D4D4 })

#618B50// And all of the above
#C586C0await #4FC1FFsc#D4D4D4.#DCDCAApush#D4D4D4(#CE9178'message'#D4D4D4, { #9CDCFEcontent#D4D4D4: #CE9178'Hello, world!'#D4D4D4 }, { #9CDCFEtokens#D4D4D4: [#CE9178'secret'#D4D4D4, #CE9178'other'#D4D4D4]#D4D4D4, #9CDCFEtopic#D4D4D4: #CE9178'room-42'#D4D4D4 })
`;

export const dockerImage = "ghcr.io/impulse-studio/realtime-service";
export const dockerCommand = `docker run -p 8080:8080 -e REALTIME_SECRET="secret" ${dockerImage}`;

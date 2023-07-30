import { Button } from '@hilla/react-components/Button.js';
import { Notification } from '@hilla/react-components/Notification.js';
import { TextField } from '@hilla/react-components/TextField.js';
import { WelcomeEndpoint } from 'Frontend/generated/endpoints.js';
import { useState } from 'react';

export default function HomeView() {
  const [name, setName] = useState('');

  return (
    <>
      <section className="flex p-m gap-m items-end">
        <TextField
          label="User name"
          onValueChanged={(e) => {
            setName(e.detail.value);
          }}
        />
        <Button
          onClick={async () => {  //TODO: Build out additional user features
            const serverResponse = await WelcomeEndpoint.sayHello(name);
            Notification.show(serverResponse);
          }}
        >
          Set user
        </Button>
      </section>
    </>
  );
}

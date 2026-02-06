import { Trans } from '@lingui/react/macro';
import { Code2, ExternalLink, Scale } from 'lucide-react';
import { Link } from 'react-router';

import { Button } from '@documenso/ui/primitives/button';

import { appMetaTags } from '~/utils/meta';

export function meta() {
  return appMetaTags('Open Source');
}

export default function OpenSource() {
  return (
    <div className="w-screen max-w-2xl px-4">
      <div className="border-border dark:bg-background z-10 rounded-xl border bg-neutral-100 p-8">
        <div className="flex items-center gap-3">
          <Code2 className="h-8 w-8" />
          <h1 className="text-2xl font-semibold">
            <Trans>Open Source</Trans>
          </h1>
        </div>

        <hr className="-mx-8 my-6" />

        <div className="space-y-6">
          <section>
            <h2 className="mb-2 text-lg font-medium">
              <Trans>About SecureSign</Trans>
            </h2>
            <p className="text-muted-foreground">
              <Trans>
                SecureSign is based on Documenso, an open source document signing platform. We are
                committed to transparency and open source software.
              </Trans>
            </p>
          </section>

          <section>
            <h2 className="mb-2 flex items-center gap-2 text-lg font-medium">
              <Scale className="h-5 w-5" />
              <Trans>License</Trans>
            </h2>
            <p className="text-muted-foreground">
              <Trans>
                This software is licensed under the GNU Affero General Public License v3.0
                (AGPL-3.0). This means you have the freedom to use, modify, and distribute this
                software, provided that any modifications are also made available under the same
                license.
              </Trans>
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-medium">
              <Trans>Source Code</Trans>
            </h2>
            <p className="text-muted-foreground mb-4">
              <Trans>
                The complete source code for this application is available on GitHub. You can view,
                fork, and contribute to the project.
              </Trans>
            </p>
            <Button asChild>
              <a
                href="https://github.com/documenso/documenso"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <Trans>View Source Code</Trans>
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-medium">
              <Trans>Attribution</Trans>
            </h2>
            <p className="text-muted-foreground">
              <Trans>
                SecureSign is proudly built upon Documenso. We thank the Documenso team and all
                contributors for their work in making document signing accessible and open.
              </Trans>
            </p>
          </section>
        </div>

        <hr className="-mx-8 my-6" />

        <div className="text-center">
          <Link to="/signin" className="text-muted-foreground hover:text-foreground text-sm">
            <Trans>Back to Sign In</Trans>
          </Link>
        </div>
      </div>
    </div>
  );
}

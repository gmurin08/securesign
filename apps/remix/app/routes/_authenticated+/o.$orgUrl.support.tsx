import { useState } from 'react';

import { Trans } from '@lingui/react/macro';
import { Code2, HelpCircleIcon, Link2Icon, Mail } from 'lucide-react';
import { Link, useSearchParams } from 'react-router';

import { useCurrentOrganisation } from '@documenso/lib/client-only/providers/organisation';
import { IS_BILLING_ENABLED } from '@documenso/lib/constants/app';
import { Button } from '@documenso/ui/primitives/button';

import { SupportTicketForm } from '~/components/forms/support-ticket-form';
import { appMetaTags } from '~/utils/meta';

export function meta() {
  return appMetaTags('Support');
}

export default function SupportPage() {
  const [showForm, setShowForm] = useState(false);
  const organisation = useCurrentOrganisation();

  const [searchParams] = useSearchParams();

  const teamId = searchParams.get('team');

  const subscriptionStatus = organisation.subscription?.status;

  const handleSuccess = () => {
    setShowForm(false);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="mx-auto w-full max-w-screen-xl px-4 md:px-8">
      <div className="mb-8">
        <h1 className="flex flex-row items-center gap-2 text-3xl font-bold">
          <HelpCircleIcon className="text-muted-foreground h-8 w-8" />
          <Trans>Support</Trans>
        </h1>

        <p className="text-muted-foreground mt-2">
          <Trans>Need help? Here are some ways to get support:</Trans>
        </p>

        <div className="mt-6 flex flex-col gap-4">
          <div className="rounded-lg border p-4">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Mail className="text-muted-foreground h-5 w-5" />
              <Trans>Email Support</Trans>
            </h2>
            <p className="text-muted-foreground mt-1">
              <Trans>
                Contact us at{' '}
                <a href="mailto:support@aldercreekdigital.com" className="text-primary underline">
                  support@aldercreekdigital.com
                </a>{' '}
                for assistance.
              </Trans>
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Code2 className="text-muted-foreground h-5 w-5" />
              <Link
                to="https://github.com/documenso/documenso"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                <Trans>Source Code</Trans>
              </Link>
            </h2>
            <p className="text-muted-foreground mt-1">
              <Trans>
                SecureSign is open source. View the source code and report issues on GitHub.
              </Trans>
            </p>
          </div>
          {organisation && IS_BILLING_ENABLED() && subscriptionStatus && (
            <>
              <div className="rounded-lg border p-4">
                <h2 className="flex items-center gap-2 text-lg font-bold">
                  <Link2Icon className="text-muted-foreground h-5 w-5" />
                  <Trans>Contact us</Trans>
                </h2>
                <p className="text-muted-foreground mt-1">
                  <Trans>We'll get back to you as soon as possible via email.</Trans>
                </p>
                <div className="mt-4">
                  {!showForm ? (
                    <Button variant="outline" size="sm" onClick={() => setShowForm(true)}>
                      <Trans>Create a support ticket</Trans>
                    </Button>
                  ) : (
                    <SupportTicketForm
                      organisationId={organisation.id}
                      teamId={teamId}
                      onSuccess={handleSuccess}
                      onClose={handleCloseForm}
                    />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

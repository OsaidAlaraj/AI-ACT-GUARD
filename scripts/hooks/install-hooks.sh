#!/bin/sh
# install-hooks.sh: point git at the committed hooks dir. `pnpm install` does the same via the
# root "prepare" script; run this by hand only to repair a checkout.
set -e
cd "$(git rev-parse --show-toplevel)"
git config core.hooksPath scripts/hooks
echo "core.hooksPath=$(git config core.hooksPath)"

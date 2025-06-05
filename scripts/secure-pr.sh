
#!/bin/bash

# This script creates a secure feature branch, commits changes, and opens a PR

set -e

# Input
FEATURE_NAME=$1
COMMIT_MSG=$2

if [[ -z "$FEATURE_NAME" || -z "$COMMIT_MSG" ]]; then
  echo "Usage: ./scripts/secure-pr.sh <feature-name> <commit-message>"
  exit 1
fi

BRANCH_NAME="feat/${FEATURE_NAME}"

# Create and switch to the feature branch
git checkout -b $BRANCH_NAME

# Stage and commit all changes
git add .
git commit -m "$COMMIT_MSG"

# Push to origin
git push -u origin $BRANCH_NAME

# Create a PR using GitHub CLI
gh pr create --base main --head $BRANCH_NAME --title "$COMMIT_MSG" --body "Automated PR for $FEATURE_NAME"

echo "✅ Pull request created for branch: $BRANCH_NAME"

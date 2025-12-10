# ChromaFlow

## Deployment Instructions

If you are deploying to Vercel and seeing `ETARGET` errors:

1. Ensure `package.json` has `"@google/genai": "*"`
2. **DELETE** `package-lock.json` from your local folder.
3. Run the following commands to push the fix to GitHub:

```bash
git add .
git commit -m "Fix dependencies"
git push
```

The build on Vercel should restart automatically with the new code.

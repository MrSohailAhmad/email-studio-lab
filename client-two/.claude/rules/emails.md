---
paths:
  - "campaigns/**/emails/*.md"
---

# Rules for every email file

Each email file must:
- Start with a line `Subject: ...` of 50 characters or fewer, then a line `Preview: ...` of 90 characters or fewer.
- Greet the reader with {{first_name}}.
- Have exactly one main link, written as [Button text](https://riseandcrumb.example/spring).
- End with our sign-off from brand/voice.md, then this two-line footer as plain text, not inside a code block:

You're getting this because you signed up for Rise & Crumb news.
Rise & Crumb, {{company_address}} · Unsubscribe: {{unsubscribe_url}}

Nothing else goes in the file: no subject options, no notes, no code blocks.

import type { LinkParamValue, RichTextParamValue } from "@uniformdev/canvas";
import {
  UniformRichText,
  UniformText,
  type ComponentParameter,
  type ComponentProps,
} from "@uniformdev/next-app-router/component";
import Link from "next/link";

interface ContentBlockParameters {
  heading: ComponentParameter<string>;
  content: ComponentParameter<RichTextParamValue>;
  link: ComponentParameter<LinkParamValue>;
  linkText: ComponentParameter<string>;
}

export default function ContentBlock({
  parameters:{
  heading,
  content,
  link,
  linkText},
  component,
}: ComponentProps<ContentBlockParameters>) {
  const href = link?.value?.path;
  const showLink =
  Boolean(href) ||
  Boolean(link?._contextualEditing?.isEditable) ||
  Boolean(linkText?._contextualEditing?.isEditable);

  return (
    <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <UniformText
      parameter={heading}
      as="h2"
      className="text-3xl font-bold text-zinc-900 md:text-4xl"
      placeholder="Heading text here..."
      component={component}
      />

      <UniformRichText
      parameter={content}
      className="mt-6 space-y-4 text-lg leading-relaxed text-zinc-700"
      placeholder="Content text here..."
      component={component}
      />

      {showLink && (
        <Link
        href={href ?? "#"}
        className="mt-8 inline-block text-lg font-medium text-blue-700 underline underline-offset-4 hover:text-blue-900"
      >
        <UniformText
        parameter={linkText}
        component={component}
        as="span"
        placeholder="Link text here..."
        />
      </Link>
      )}

    </section>
  );
}
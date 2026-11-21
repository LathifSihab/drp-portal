<script lang="ts">
	import type { AppId } from '#lib/apps.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	// Line icons, 24×24, drawn with currentColor.
	const icons: Record<AppId, string> = {
		// Board with three columns: projects by phase.
		operational:
			'M4 4h16v16H4z M9.33 4v16 M14.67 4v16 M5.8 7h1.8 M11.1 7h1.8 M11.1 10h1.8 M16.4 7h1.8',
		// Page with a pen: articles.
		cms: 'M6 3h8l4 4v6 M14 3v4h4 M6 3v18h6 M9 9h4 M9 13h3 M15.5 21l-1 .5.5-1 5-5 .5.5z',
		// Receipt: quotes and invoices.
		clientzone: 'M6 3h12v18l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5-2 1.5z M9 8h6 M9 12h6 M9 16h3'
	};
</script>

<section
	class="mb-10 grid gap-6 border-t border-border pt-6 md:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]"
>
	<div>
		<h1 class="display text-4xl sm:text-5xl">Welcome</h1>
		<p class="mt-3 text-muted-foreground">
			Signed in as <span class="font-medium text-foreground">{data.user.email}</span>
		</p>
	</div>
	<p class="self-end text-sm text-muted-foreground">
		One Microsoft sign-in for every DRP BuildLab internal tool. Pick an app below; it opens without
		asking you to sign in again.
	</p>
</section>

<h2 class="sr-only">Apps</h2>
<ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
	{#each data.apps as app (app.id)}
		<li>
			{#if app.url}
				<!-- eslint-disable svelte/no-navigation-without-resolve -- another app, not a route of this one -->
				<a
					href={app.url}
					data-sveltekit-reload
					class="card group flex h-full flex-col gap-4 p-5 transition-[border-color,box-shadow] hover:border-primary hover:shadow-[0_0_0_3px_var(--ring)]"
				>
					{@render tile(app)}
				</a>
				<!-- eslint-enable svelte/no-navigation-without-resolve -->
			{:else}
				<div class="card flex h-full flex-col gap-4 p-5 opacity-70" aria-disabled="true">
					{@render tile(app)}
				</div>
			{/if}
		</li>
	{/each}
</ul>

{#snippet tile(app: (typeof data.apps)[number])}
	<div class="flex items-center gap-3">
		<span
			class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted text-accent"
			aria-hidden="true"
		>
			<svg
				viewBox="0 0 24 24"
				class="size-6"
				fill="none"
				stroke="currentColor"
				stroke-width="1.6"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d={icons[app.id]} />
			</svg>
		</span>
		<h3 class="text-lg font-semibold">{app.name}</h3>
		{#if app.url}
			<span
				class="ml-auto text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
				aria-hidden="true"
			>
				→
			</span>
		{/if}
	</div>
	<p class="text-sm text-muted-foreground">{app.description}</p>
	<p class="mt-auto font-mono text-xs text-muted-foreground">
		{app.host ?? 'Address not set yet'}
	</p>
{/snippet}

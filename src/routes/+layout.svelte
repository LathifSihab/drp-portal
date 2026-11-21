<script lang="ts">
	import '../app.css';
	import { dev } from '$app/env';
	import { resolve } from '$app/paths';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} type="image/svg+xml" />
	<title>DRP Internal</title>
</svelte:head>

<a
	href="#main"
	class="sr-only rounded-full bg-card px-4 py-2 focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50"
>
	Skip to content
</a>

<!-- Same dark bar as DRP Operational. -->
<header class="sticky top-0 z-30 bg-ink text-on-ink">
	<div class="mx-auto flex max-w-7xl items-center gap-5 px-4 py-3 sm:gap-8">
		<a href={resolve('/')} class="flex items-center gap-3" aria-label="DRP BuildLab Internal, home">
			<span class="flex flex-col leading-[0.82]" aria-hidden="true">
				<span
					class="font-display text-[24px] font-black tracking-[-0.02em] italic [font-stretch:88%]"
				>
					DRP
				</span>
				<span
					class="mt-[3px] font-display text-[7.6px] font-extrabold tracking-[0.42em] text-brand-hi [font-stretch:110%]"
				>
					BUILDLAB
				</span>
			</span>
			<span class="hidden h-7 w-px bg-white/15 sm:block" aria-hidden="true"></span>
			<span class="hidden text-sm font-medium text-on-ink-muted sm:inline" aria-hidden="true">
				Internal
			</span>
		</a>

		<div class="ml-auto flex items-center gap-2.5 text-[13px] text-on-ink-muted">
			<span class="truncate">{data.user.email}</span>
			{#if !dev}
				<!-- Cloudflare Access's logout page: revokes the shared sign-in session for every app
				     (Cloudflare docs, session management). The CMS and client zone keep their own 8-hour
				     cookie until it expires or their own Sign out is used. A full page load. -->
				<!-- eslint-disable svelte/no-navigation-without-resolve -- served by Cloudflare, not a route of this app -->
				<a
					href="/cdn-cgi/access/logout"
					data-sveltekit-reload
					class="rounded-full px-2.5 py-0.5 font-medium text-on-ink ring-1 ring-white/25 transition-colors hover:bg-white/10"
				>
					Log out
				</a>
				<!-- eslint-enable svelte/no-navigation-without-resolve -->
			{/if}
		</div>
	</div>
</header>

<main id="main" class="mx-auto max-w-7xl px-4 py-8 sm:py-12">
	{@render children()}
</main>

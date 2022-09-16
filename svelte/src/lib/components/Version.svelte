<script lang="ts">
	let version: string = '-';

	let checkingForUpdate: boolean = false;
	let updateAvailable: boolean = false;
	let updateNotAvailable: boolean = false;
	let downloading: boolean = false;
	let quitAndInstall: boolean = false;

	let downloadMessage: string = '';

	const updaterInfo = globalThis['ipc' as keyof typeof globalThis]['updaterInfo'];

	updaterInfo.send('requestVersionNumber', null);

	updaterInfo.receive('getVersionNumber', (data: { version: string }) => {
		version = data.version;
	});

	function check() {
		checkingForUpdate = true;
		updaterInfo.send('checkForUpdate', { version });
	}

	updaterInfo.receive('checkingForUpdate', () => {
		checkingForUpdate = true;
	});

	updaterInfo.receive('updateAvailable', () => {
		checkingForUpdate = false;
		updateAvailable = true;
	});

	updaterInfo.receive('updateNotAvailable', () => {
		checkingForUpdate = false;
		updateAvailable = false;
		updateNotAvailable = true;
	});

	function startDownloadUpdate() {
		updaterInfo.send('startDownloadUpdate', null);
		updateAvailable = false;
		downloading = true;
	}

	updaterInfo.receive(
		'downloadProgress',
		(data: { bytesPerSecond: string; percent: string; transferred: string; total: string }) => {
			downloading = true;
			updateAvailable = false;
			let log_message = 'Download speed: ' + data.bytesPerSecond;
			log_message = log_message + ' - Downloaded ' + data.percent + '%';
			log_message = log_message + ' (' + data.transferred + '/' + data.total + ')';
			downloadMessage = log_message;
		}
	);

	updaterInfo.receive('updateDownloaded', () => {
		downloading = false;
		updateAvailable = false;
		quitAndInstall = true;
	});

	function install() {
		updaterInfo.send('quitAndInstall', null);
		quitAndInstall = false;
	}
</script>

<div>
	App version <span class="version">{version}</span>.
</div>

<div>
	{#if !checkingForUpdate && !updateAvailable && !downloading && !quitAndInstall}
		<p><button on:click={check}>Check for Update</button></p>
	{/if}
	{#if checkingForUpdate}
		<p>Checking for update...</p>
	{/if}
	{#if updateAvailable}
		<p><button on:click={startDownloadUpdate}>Updates are available. Click to download.</button></p>
	{/if}
	{#if updateNotAvailable}
		<p>Update not available</p>
	{/if}
	{#if downloading}
		{downloadMessage}
	{/if}
	{#if quitAndInstall}
		<p><button on:click={install}>The updates are ready. Click to quit and install.</button></p>
	{/if}
</div>

<style>
	.version {
		color: #ff3e00;
	}
</style>

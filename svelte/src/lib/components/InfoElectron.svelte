<script lang="ts">
	import systemInfo from '@el3um4s/renderer-for-electron-system-info';

	let chrome: string = '-';
	let node: string = '-';
	let electron: string = '-';
	let app: string = '-';

	systemInfo.requestSystemInfo({
		callback: (data) => {
			chrome = data.chrome;
			node = data.node;
			electron = data.electron;
			app = data.app;
		}
	});
</script>

<div>
	<p>We are using</p>
	<ul>
		<li>Node.js <span class="version">{node}</span></li>
		<li>Electron <span class="version">{electron}</span></li>
		<li>Chromium <span class="version">{chrome}</span></li>
		<li>App <span class="version">{app}</span></li>
	</ul>
</div>

<style>
	.version {
		color: #ff3e00;
	}
</style>

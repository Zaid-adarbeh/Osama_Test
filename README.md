# Tabbed Time Series Panel

This Grafana panel plugin behaves like the built-in Time series panel but shows only one query at a time. Multiple queries render as tabs and switching tabs updates the visualization instantly.

## Installation on Linux (Grafana v11.4.0)

1. **Install dependencies**
   ```bash
   sudo apt-get update && sudo apt-get install -y nodejs npm git
   ```
   Install Grafana 11.4.0:
   ```bash
   wget https://dl.grafana.com/oss/release/grafana-11.4.0.linux-amd64.tar.gz
   tar -zxvf grafana-11.4.0.linux-amd64.tar.gz
   ```
2. **Build the plugin**
   ```bash
   git clone <repo_url>
   cd Osama_Test
   npm install
   npm run build
   ```
3. **Install the plugin**
   ```bash
   sudo mkdir -p /var/lib/grafana/plugins/tabbed-timeseries-panel
   sudo cp -r dist /var/lib/grafana/plugins/tabbed-timeseries-panel
   ```
4. **Allow unsigned plugin**
   Edit `/etc/grafana/grafana.ini`:
   ```ini
   [plugins]
   allow_loading_unsigned_plugins = myorg-tabbed-timeseries-panel
   ```
5. **Restart Grafana**
   ```bash
   sudo systemctl restart grafana-server
   ```

## Example dashboard

1. Ensure the built-in **TestData DB** data source is enabled.
2. In Grafana, go to **Dashboards → Import** and upload `example-dashboard.json` from this repository.
3. Open the imported dashboard. The panel will show a tab bar with one tab per query. Click tabs to switch between series.

## Troubleshooting checklist

- Confirm the plugin was copied to `/var/lib/grafana/plugins/tabbed-timeseries-panel`.
- Verify `allow_loading_unsigned_plugins` includes `myorg-tabbed-timeseries-panel`.
- Restart Grafana after installing or updating the plugin.
- Check file permissions so Grafana can read the plugin files.
- Inspect Grafana logs at `/var/log/grafana/grafana.log` for any plugin errors.


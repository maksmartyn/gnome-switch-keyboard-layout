/**
 * About:
 * 
 * Extention is a fork from "switch-to-last-keyboard-layout@envek".
 * It can grant access to swiching keyboard layouts by console command.
 * You also can bind command to custom hotkey in gnome-settings tool.
 * Thanks to https://github.com/Envek
 * 
 * 
 * Installation:
 * 
 *  1. mkdir -p ~/.local/share/gnome-shell/extensions/switch-keyboard-layout@maksmartyn
 *  2. cp ./extension.js ./metadata.json ~/.local/share/gnome-shell/extensions/switch-keyboard-layout@maksmartyn
 *  3. Restart GNOME Shell (e.g. log out and log in)
 *  4. Enable it in the GNOME Extensions App
 * 
 * 
 * Usage:
 * 
 * for cycle switching between last used:
 * $ gdbus call --session --dest org.gnome.Shell --object-path /org/gnome/Shell/Extensions/SwitchKeyboardLayout --method org.gnome.Shell.Extensions.SwitchKeyboardLayout.Next
 * 
 * for first layout:
 * $ gdbus call --session --dest org.gnome.Shell --object-path /org/gnome/Shell/Extensions/SwitchKeyboardLayout --method org.gnome.Shell.Extensions.SwitchKeyboardLayout.First
 * 
 * for second layout:
 * $ gdbus call --session --dest org.gnome.Shell --object-path /org/gnome/Shell/Extensions/SwitchKeyboardLayout --method org.gnome.Shell.Extensions.SwitchKeyboardLayout.Second
 * 
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * 
 * SPDX-License-Identifier: GPL-3.0-or-later
 */ 

'use strict';

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

const { Gio, Meta, Shell } = imports.gi;
const { getInputSourceManager } = imports.ui.status.keyboard;

const MR_DBUS_IFACE = `
<node>
    <interface name="org.gnome.Shell.Extensions.SwitchKeyboardLayout">
        <method name="Next">
        </method>
        <method name="First">
        </method>
        <method name="Second">
        </method>
    </interface>
</node>`;

class Extension {
    constructor() {
    }

    enable() {
        log(`enabling extension '${Me.metadata.name}'.`);
        this._dbus = Gio.DBusExportedObject.wrapJSObject(MR_DBUS_IFACE, this);
        this._dbus.export(Gio.DBus.session, '/org/gnome/Shell/Extensions/SwitchToLastKeyboardLayout');
    }

    disable() {
        log(`disabling extension '${Me.metadata.name}'.`);
        this._dbus.flush();
        this._dbus.unexport();
        delete this._dbus;
    }

    First() {
        getInputSourceManager().inputSources[0].activate()
    }

    Second() {
        getInputSourceManager().inputSources[1].activate()
    }

    Next() {
        getInputSourceManager()._mruSources[1].activate()
    }
}

function init() {
    log(`initializing extension '${Me.metadata.name}'`);
    return new Extension();
}

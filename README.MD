# Switch keyboard layout in gnome switcher

## About:

Extention is a fork from "switch-to-last-keyboard-layout@envek".

It can grant access to swiching keyboard layouts by console command.

You also can bind command to custom hotkey in gnome-settings tool.

Thanks to https://github.com/Envek


## Installation:

 1. make directory for extention:
 ```
 $ mkdir -p ~/.local/share/gnome-shell/extensions/switch-keyboard-layout@maksmartyn
 ```
 2. copy repository files into directory:
 ```
 $ cp ./extension.js ./metadata.json ~/.local/share/gnome-shell/extensions/switch-keyboard-layout@maksmartyn
 ```
 3. Restart GNOME Shell (e.g. log out and log in)
 4. Enable it in the GNOME Extensions App


## Usage:

* for cycle switching between last used:
```
$ gdbus call --session --dest org.gnome.Shell --object-path /org/gnome/Shell/Extensions/SwitchKeyboardLayout --method org.gnome.Shell.Extensions.SwitchKeyboardLayout.Next
```

* for first layout:
```
$ gdbus call --session --dest org.gnome.Shell --object-path /org/gnome/Shell/Extensions/SwitchKeyboardLayout --method org.gnome.Shell.Extensions.SwitchKeyboardLayout.First
```

* for second layout:
```
$ gdbus call --session --dest org.gnome.Shell --object-path /org/gnome/Shell/Extensions/SwitchKeyboardLayout --method org.gnome.Shell.Extensions.SwitchKeyboardLayout.Second
```

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

SPDX-License-Identifier: GPL-3.0-or-later

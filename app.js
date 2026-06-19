const grid = document.getElementById("proposalGrid");
const cardTemplate = document.getElementById("cardTemplate");
const exportButton = document.getElementById("exportButton");
const assetUploadInput = document.getElementById("assetUploadInput");
const projectLoadInput = document.getElementById("projectLoadInput");
const saveProjectButton = document.getElementById("saveProjectButton");
const loadProjectButton = document.getElementById("loadProjectButton");

const STORAGE_KEY = "grl-proposal-builder-v1";
const PROJECT_FILE_VERSION = 1;
const MAX_HISTORY = 80;
const LOCAL_BRAND_MARK_PATH = "assets/logos/WhiteGLogo.svg";
const LOCAL_BRAND_LOGO_PATH = "assets/logos/WhiteLogoText.svg";
const BULLET_PLACEHOLDER = "[ ADD ITEM ]";
const ESTIMATE_PLACEHOLDER = "[   ]";
const DEFAULT_TEMPLATE_NOTE_TITLE = "MATTER OF DREAMS";
const DEFAULT_TEMPLATE_NOTE_BODY = "We create immersive artistic experiences shaped around each vision, blending performance, atmosphere and detail into moments that feel cinematic, personal and unforgettable.";
const LEGACY_TEMPLATE_NOTE_TITLE = "TEMPLATE - EASY TO EDIT";
const LEGACY_TEMPLATE_NOTE_BODY = "Simply click on any text or field to customize the content, scope or estimation range.";
const DEFAULT_BRAND_MARK = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNjAgMTYwIiByb2xlPSJpbWciPgo8ZyB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAtMSAwIDE2MCkiPgogIDxwYXRoIGQ9Ik0wIDAgTDEyLjk3NiAyNC4wNyBMMTUuOTYxIDI5LjYwNCBMMjQuNTQxIDQ1LjUyNCBMMzcuMTgyIDY4Ljk4MSBMMzguNjgxIDcxLjc2MSBMMzkuNzAzIDczLjY1NSBMNDAuNDYgNzUuMDU5IEw0My40MTggODAuNTU5IEw1Ni44MyAxMDUuNDMzIEw1Ny4xNTYgMTA2LjA0NyBMNzQuMzU3IDEzNy45NjgiIHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIDEgNjIuMzUwMyAxMC4zNzY1KSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjAuNjgyIi8+CiAgPHBhdGggZD0iTTAgMCBDMy43MjcgLTMuODM3IDcuOTczIC02LjY1OCAxMi43MzcgLTguNDcxIEM3LjM1MyAtOC4wODkgMi4xMjYgLTYuOTU4IC0yLjc4NyAtNS4xNzIgWiIgdHJhbnNmb3JtPSJtYXRyaXgoMSAwIDAgMSA1Ni4wNzMgNDYuOTE0MykiIGZpbGw9IiNmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIvPgogIDxwYXRoIGQ9Ik0wIDAgQy04LjI1MyAtMy4xNDIgLTE0LjkzOCAtOS4zMDIgLTIwLjA5IC0xOC40ODkgQy0yNC4xNzkgLTI1Ljc3NCAtMjYuNjUzIC0zNC4yMzggLTI3LjQ5OCAtNDMuODgxIEMtMjcuNzAzIC00Ni4xNSAtMjcuNjg2IC00OC42IC0yNy43MDYgLTUxLjAwNiBDLTI3LjY4NiAtNTMuNDEyIC0yNy42NDYgLTUzLjYxMSAtMjcuNzA2IC01OC4wMjYgTC0yNy40OTggLTkyLjQwMyBDLTQwLjkzNyAtODMuMzggLTQ5Ljk2IC02OC41ODUgLTQ5Ljc3NiAtNTAuODk0IEMtNTAuMDY5IC0yMi43MjggLTI3LjA1NiAtMS45MTUgMCAwIiB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAxIDY4LjgxMDMgMTQwLjIyNDQpIiBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz4KICA8cGF0aCBkPSJNMCAwIEwxOC41NTcgMCBMMTAuOTUyIC0xNC4xMiBDMTAuNjM4IC0xMS4xNTYgOS45NjMgLTguNzQzIDguOTM1IC02Ljg4MyBDNy40NTYgLTQuMjExIDQuNDY0IC0xLjkyOCAwIDAiIHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIDEgNzYuMjA0MSA4NC41ODM3KSIgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJub256ZXJvIi8+CiAgPHBhdGggZD0iTTAgMCBMLTM1LjE5MiAwIEwtMjYuNjEyIDE1LjkyIEwtMTMuOTcxIDM5LjM3NyBMLTEyLjQ3MSA0Mi4xNTcgTC0xMS40NDkgNDQuMDUxIEwtMTEuNDQ5IDIwLjI0IEMtMTEuNDQ5IDE0LjM4IC0xMC43MiAxMC4wMTEgLTkuMjI3IDcuMTU1IEMtNy43NjkgNC4zIC00LjY4OSAxLjkwOCAwIDAiIHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIDEgMTIwLjczOTEgMzguNDM5OCkiIGZpbGw9IiNmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIvPgogIDxwYXRoIGQ9Ik0wIDAgQzExLjcxNiA1LjE1NiAyOS45OSAtNS41NSAyMi44NjkgLTE4Ljk1MSBDMjEuNDYxIC0yMS42MDEgMTkuNDAzIC0yMy4zNDEgMTYuNzI1IC0yNC4xODMgQzE0LjAxOCAtMjUuMDExIDExLjI1NyAtMjQuNjc3IDguMzg2IC0yMy4xNTEgQzUuNzYzIC0yMS43NTcgMy45NSAtMTkuODM4IDIuOTIgLTE3LjM3OSBDMS44OSAtMTQuOTE5IDIuMTY2IC0xMi4yNjkgMy42OTEgLTkuMzk3IEM0LjUxMyAtNy44NTEgNS43ODggLTYuNjUyIDcuNTE2IC01Ljc5OSBDMTYuMjExIC0xLjY0OSAzLjkyMyAtMC41NTYgMCAwIiB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAxIDgyLjUyNzggMTM5LjgzOTMpIiBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4KICA8cGF0aCBkPSJNMCAwIEwtMC4xODQgLTAuMzY3IEMtMS4yODQgMCAtMi4zODQgMC4xODMgLTQuMjE4IDAuMTgzIEMtNi43ODYgMC4xODMgLTkuMzUzIC0xLjAwOSAtMTEuNTUzIC0zLjc1OSBMLTExLjU1MyAtNDcuOTU3IEwtMTEuOTIxIC00Ny45NTcgTC0xMS45MjEgMC4xODMgTC0xMS41NTMgMC4xODMgTC0xMS41NTMgLTMuMTE4IEMtOS4yNjEgLTAuNTUgLTYuOTY5IDAuNTUgLTQuMjE4IDAuNTUgQy0yLjM4NCAwLjU1IC0xLjI4NCAwLjM2NyAwIDAiIHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIDEgNTkuMjQ2MSA5My4zOTQpIiBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz4KICA8cGF0aCBkPSJNMCAwIEwtMC4xODQgLTAuMzY3IEMtMS4yODQgMCAtMi4zODQgMC4xODMgLTQuMjE4IDAuMTgzIEMtNi43ODYgMC4xODMgLTkuMzUzIC0xLjAwOSAtMTEuNTUzIC0zLjc1OSBMLTExLjU1MyAtNDcuOTU3IEwtMTEuOTIxIC00Ny45NTcgTC0xMS45MjEgMC4xODMgTC0xMS41NTMgMC4xODMgTC0xMS41NTMgLTMuMTE4IEMtOS4yNjEgLTAuNTUgLTYuOTY5IDAuNTUgLTQuMjE4IDAuNTUgQy0yLjM4NCAwLjU1IC0xLjI4NCAwLjM2NyAwIDAiIHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIDEgNTkuMjQ2MSA5My4zOTQpIiBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz4KPC9nPgo8L3N2Zz4K";
const DEFAULT_BRAND_LOGO = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyODUuMyAxNC4yIj4KICA8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMzAuNS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogMi4xLjQgQnVpbGQgMykgIC0tPgogIDxkZWZzPgogICAgPHN0eWxlPgogICAgICAuc3QwIHsKICAgICAgICBsZXR0ZXItc3BhY2luZzogLjFlbTsKICAgICAgfQoKICAgICAgLnN0MSB7CiAgICAgICAgbGV0dGVyLXNwYWNpbmc6IC4xZW07CiAgICAgIH0KCiAgICAgIC5zdDIgewogICAgICAgIGxldHRlci1zcGFjaW5nOiAuMmVtOwogICAgICB9CgogICAgICAuc3QzLCAuc3Q0IHsKICAgICAgICBmaWxsOiAjZmZmOwogICAgICB9CgogICAgICAuc3Q1IHsKICAgICAgICBsZXR0ZXItc3BhY2luZzogLjJlbTsKICAgICAgfQoKICAgICAgLnN0NiB7CiAgICAgICAgbGV0dGVyLXNwYWNpbmc6IC4xZW07CiAgICAgIH0KCiAgICAgIC5zdDcgewogICAgICAgIGxldHRlci1zcGFjaW5nOiAwZW07CiAgICAgIH0KCiAgICAgIC5zdDggewogICAgICAgIGxldHRlci1zcGFjaW5nOiAuMmVtOwogICAgICB9CgogICAgICAuc3Q5IHsKICAgICAgICBsZXR0ZXItc3BhY2luZzogLjJlbTsKICAgICAgfQoKICAgICAgLnN0MTAgewogICAgICAgIGxldHRlci1zcGFjaW5nOiAuMmVtOwogICAgICB9CgogICAgICAuc3Q0IHsKICAgICAgICBmb250LWZhbWlseTogU2lnbmFsLUJvbGQsIFNpZ25hbDsKICAgICAgICBmb250LXNpemU6IDguMnB4OwogICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7CiAgICAgIH0KCiAgICAgIC5zdDExIHsKICAgICAgICBsZXR0ZXItc3BhY2luZzogLjFlbTsKICAgICAgfQoKICAgICAgLnN0MTIgewogICAgICAgIGxldHRlci1zcGFjaW5nOiAwZW07CiAgICAgIH0KICAgIDwvc3R5bGU+CiAgPC9kZWZzPgogIDxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0xMi4zLDEyLjVjLS41LjQtMSwuNy0xLjUuOS0uNS4yLTEuMS40LTEuNy42cy0xLjIuMi0xLjcuMmMtMSwwLTItLjItMi45LS42LS45LS40LTEuNy0uOS0yLjMtMS42cy0xLjItMS40LTEuNi0yLjNjLS40LS45LS42LTEuOC0uNi0yLjdzLjItMS44LjYtMi43Yy40LS44LjktMS42LDEuNS0yLjIuNy0uNiwxLjQtMS4xLDIuMy0xLjVDNS4zLjIsNi4zLDAsNy40LDBzMi4zLjIsMy4yLjdjMSwuNSwxLjgsMS4xLDIuNSwydi4yYy4xLDAtMSwuOS0xLC45di0uMmMtLjctLjctMS40LTEuMy0yLjItMS43LS43LS40LTEuNi0uNi0yLjYtLjZzLTEuNi4yLTIuMy41Yy0uNy4zLTEuNC43LTEuOSwxLjItLjUuNS0xLDEuMS0xLjMsMS44LS4zLjctLjUsMS40LS41LDIuMnMuMiwxLjUuNSwyLjJjLjMuNy43LDEuMywxLjMsMS45LjUuNSwxLjIsMSwxLjksMS4zLjcuMywxLjUuNSwyLjMuNXMxLjktLjIsMi43LS41Yy44LS4zLDEuNS0uOSwyLTEuNnYtMS45aC01LjR2LTEuNGg2Ljl2My4zYzAsLjIsMCwuMy0uMS41LS4zLjUtLjcuOS0xLjEsMS4zIi8+CiAgPHBhdGggY2xhc3M9InN0MyIgZD0iTTIwLjYsMTMuOUwyNi42LjVjMC0uMS4yLS4zLjMtLjQuMS0uMS4zLS4yLjUtLjJzLjQsMCwuNS4xYy4xLDAsLjIuMi4zLjRsNS45LDEzLjRoLTEuNmwtMi40LTUuNGgtNS41bC0yLjQsNS40aC0xLjZaTTI5LjYsNy4zbC0yLjItNC45LTIuMiw0LjloNC40WiIvPgogIDxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik00MywxMy45Yy0uMiwwLS41LDAtLjYtLjItLjItLjItLjMtLjQtLjMtLjZWMS4xYzAtLjIsMC0uNC4yLS42LjItLjIuNC0uMi42LS4yaDUuOWMuNiwwLDEuMSwwLDEuNi4zLjUuMi45LjUsMS4zLjguNC4zLjYuNy44LDEuMi4yLjUuMy45LjMsMS41cy0uMSwxLjEtLjQsMS42Yy0uMi41LS42LjktMSwxLjMuNi4zLDEuMS44LDEuNSwxLjMuMy41LjUsMS4yLjUsMS45czAsMS0uMywxLjVjLS4yLjUtLjUuOS0uOCwxLjItLjQuMy0uOC42LTEuMy44LS41LjItMSwuMy0xLjYuM2gtNi41Wk00My42LDYuNGg1LjNjLjQsMCwuNywwLDEtLjIuMy0uMS42LS4zLjgtLjUuMi0uMi40LS41LjUtLjguMS0uMy4yLS42LjItLjlzMC0uNi0uMi0uOWMtLjEtLjMtLjMtLjUtLjUtLjctLjItLjItLjUtLjQtLjgtLjUtLjMtLjEtLjYtLjItMS0uMmgtNS4zdjQuN1pNNDkuNSwxMi41Yy40LDAsLjcsMCwxLS4yLjMtLjEuNi0uMy44LS41LjItLjIuNC0uNS41LS44LjEtLjMuMi0uNi4yLS45czAtLjYtLjItLjljLS4xLS4zLS4zLS41LS41LS43LS4yLS4yLS41LS40LS44LS41LS4zLS4xLS42LS4yLTEtLjJoLTUuOXY0LjhoNS45WiIvPgogIDxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik02OC45LDguOGgtNC41djUuMmgtMS41VjEuMWMwLS4yLDAtLjQuMi0uNi4yLS4yLjQtLjIuNi0uMmg1LjZjLjcsMCwxLjMuMSwxLjguNC42LjIsMSwuNiwxLjQsMSwuNC40LjcuOS45LDEuNHMuMywxLjEuMywxLjcsMCwxLS4zLDEuNGMtLjIuNC0uNC44LS43LDEuMi0uMy4zLS43LjYtMS4xLjktLjQuMi0uOS40LTEuNC41bDMuOSw1LjNoLTEuN2wtMy44LTUuMlpNNjQuNCw3LjRoNS4xYy40LDAsLjgsMCwxLjItLjIuNC0uMS43LS4zLDEtLjYuMy0uMi41LS41LjYtLjkuMi0uMy4yLS43LjItMS4xczAtLjgtLjItMS4xYy0uMi0uNC0uNC0uNy0uNi0uOXMtLjYtLjUtMS0uN2MtLjQtLjItLjgtLjItMS4yLS4yaC01LjF2NS43WiIvPgogIDxyZWN0IGNsYXNzPSJzdDMiIHg9IjgyLjUiIHk9Ii4zIiB3aWR0aD0iMS41IiBoZWlnaHQ9IjEzLjciLz4KICA8cGF0aCBjbGFzcz0ic3QzIiBkPSJNMTAzLjIsNy44aC05LjF2NC44aDkuNnYxLjRoLTEwLjJjLS4yLDAtLjUsMC0uNi0uMi0uMi0uMi0uMy0uNC0uMy0uNlYxLjFjMC0uMiwwLS40LjItLjYuMi0uMi40LS4yLjYtLjJoMTAuMnYxLjRoLTkuNnY0LjdoOS4xdjEuNFoiLz4KICA8cGF0aCBjbGFzcz0ic3QzIiBkPSJNMTEzLjksMTMuN2MtLjItLjItLjMtLjQtLjMtLjZWLjNoMS41djEyLjNoOS4zdjEuNGgtOS44Yy0uMiwwLS41LDAtLjYtLjIiLz4KICA8cGF0aCBjbGFzcz0ic3QzIiBkPSJNMTQzLjQsNy44aC05LjF2NC44aDkuNnYxLjRoLTEwLjJjLS4yLDAtLjUsMC0uNi0uMi0uMi0uMi0uMy0uNC0uMy0uNlYxLjFjMC0uMiwwLS40LjItLjYuMi0uMi40LS4yLjYtLjJoMTAuMnYxLjRoLTkuNnY0LjdoOS4xdjEuNFoiLz4KICA8cGF0aCBjbGFzcz0ic3QzIiBkPSJNMTU5LjMsOC44aC00LjV2NS4yaC0xLjVWMS4xYzAtLjIsMC0uNC4yLS42LjItLjIuNC0uMi42LS4yaDUuNmMuNywwLDEuMy4xLDEuOC40LjYuMiwxLC42LDEuNCwxLC40LjQuNy45LjksMS40cy4zLDEuMS4zLDEuNywwLDEtLjMsMS40Yy0uMi40LS40LjgtLjcsMS4yLS4zLjMtLjcuNi0xLjEuOS0uNC4yLS45LjQtMS40LjVsMy45LDUuM2gtMS43bC0zLjgtNS4yWk0xNTQuOSw3LjRoNS4xYy40LDAsLjgsMCwxLjItLjIuNC0uMS43LS4zLDEtLjYuMy0uMi41LS41LjYtLjkuMi0uMy4yLS43LjItMS4xczAtLjgtLjItMS4xYy0uMi0uNC0uNC0uNy0uNi0uOS0uMy0uMy0uNi0uNS0xLS43LS40LS4yLS44LS4yLTEuMi0uMmgtNS4xdjUuN1oiLz4KICA8cmVjdCBjbGFzcz0ic3QzIiB4PSIxNzMiIHk9Ii4zIiB3aWR0aD0iMS41IiBoZWlnaHQ9IjEzLjciLz4KICA8cGF0aCBjbGFzcz0ic3QzIiBkPSJNMTkyLjgsMS43aC05LjhWLjNoMTEuMWMuMiwwLC41LDAsLjYuMi4yLjIuMi40LjIuNnMwLC4yLDAsLjNjMCwwLDAsLjItLjIuM2wtOS44LDEwLjloOS45djEuNGgtMTEuMmMtLjMsMC0uNSwwLS42LS4zLS4yLS4yLS4yLS40LS4yLS42czAtLjQuMi0uNWw5LjgtMTAuOVoiLz4KICA8cGF0aCBjbGFzcz0ic3QzIiBkPSJNMjEzLjMsMS43aC05LjhWLjNoMTEuMWMuMiwwLC41LDAsLjYuMi4yLjIuMi40LjIuNnMwLC4yLDAsLjNjMCwwLDAsLjItLjIuM2wtOS44LDEwLjloOS45djEuNGgtMTEuMmMtLjMsMC0uNSwwLS42LS4zLS4yLS4yLS4yLS40LS4yLS42czAtLjQuMi0uNWw5LjgtMTAuOVoiLz4KICA8cmVjdCBjbGFzcz0ic3QzIiB4PSIyMjQuNSIgeT0iLjMiIHdpZHRoPSIxLjUiIGhlaWdodD0iMTMuNyIvPgogIDxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0yMzQuOSwxMy43Yy0uMi0uMi0uMy0uNC0uMy0uNlYuM2gxLjV2MTIuM2g5LjN2MS40aC05LjhjLS4yLDAtLjUsMC0uNi0uMiIvPgogIDxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0yNTIuNCwxMy45bDYtMTMuNGMwLS4xLjItLjMuMy0uNC4xLS4xLjMtLjIuNS0uMnMuNCwwLC41LjFjLjEsMCwuMi4yLjMuNGw1LjksMTMuNGgtMS42bC0yLjQtNS40aC01LjVsLTIuNCw1LjRoLTEuNlpNMjYxLjQsNy4zbC0yLjItNC45LTIuMiw0LjloNC40WiIvPgogIDxwYXRoIGNsYXNzPSJzdDMiIGQ9Ik0yNzQuOCwxMy45Yy0uMiwwLS41LDAtLjYtLjItLjItLjItLjMtLjQtLjMtLjZWMS4xYzAtLjIsMC0uNC4yLS42LjItLjIuNC0uMi42LS4yaDUuOWMuNiwwLDEuMSwwLDEuNi4zLjUuMi45LjUsMS4zLjguNC4zLjYuNy44LDEuMi4yLjUuMy45LjMsMS41cy0uMSwxLjEtLjQsMS42Yy0uMi41LS42LjktMSwxLjMuNi4zLDEuMS44LDEuNSwxLjMuMy41LjUsMS4yLjUsMS45czAsMS0uMywxLjVjLS4yLjUtLjUuOS0uOCwxLjItLjQuMy0uOC42LTEuMy44LS41LjItMSwuMy0xLjYuM2gtNi41Wk0yNzUuNCw2LjRoNS4zYy40LDAsLjcsMCwxLS4yLjMtLjEuNi0uMy44LS41LjItLjIuNC0uNS41LS44LjEtLjMuMi0uNi4yLS45czAtLjYtLjItLjljLS4xLS4zLS4zLS41LS41LS43LS4yLS4yLS41LS40LS44LS41LS4zLS4xLS42LS4yLTEtLjJoLTUuM3Y0LjdaTTI4MS4zLDEyLjVjLjQsMCwuNywwLDEtLjIuMy0uMS42LS4zLjgtLjUuMi0uMi40LS41LjUtLjguMS0uMy4yLS42LjItLjlzMC0uNi0uMi0uOWMtLjEtLjMtLjMtLjUtLjUtLjdzLS41LS40LS44LS41Yy0uMy0uMS0uNi0uMi0xLS4yaC01Ljl2NC44aDUuOVoiLz4KPC9zdmc+Cg==";

const DEFAULT_BRAND_LOGO_TOKEN = "default:brand-logo";

let state = loadState();
let history = [];
let activeEditSnapshot = null;
let pendingAssetTarget = null;
let dragState = null;

function uid() {
  return `box_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function defaultGlobals() {
  return {
    brandMarkSrc: DEFAULT_BRAND_MARK,
    brandLogoSrc: DEFAULT_BRAND_LOGO_TOKEN,
    documentTitle: "ESTIMATION",
    documentSubtitle: "CREATIVE PROPOSAL",
    notesTitle: "NOTES",
    notesBody: "Every project is tailored with intention - aligned with your vision, designed to leave a lasting impression.",
    pillar1: "ARTISTIC CONTENTS INCLUDED",
    pillar2: "TAILORED FOR YOUR VISION",
    pillar3: "IMMERSIVE EXPERIENCE",
    pillar4: "EXTRAORDINARY EXECUTION",
    templateNoteTitle: DEFAULT_TEMPLATE_NOTE_TITLE,
    templateNoteBody: DEFAULT_TEMPLATE_NOTE_BODY
  };
}

function makeSection(label, icon, items = []) {
  return {
    id: uid(),
    label,
    icon,
    items: items.length ? items : [""]
  };
}

function makeBox(title = "ESSENCE") {
  return {
    id: uid(),
    title,
    subtitle: "For focused projects\nwith core artistic impact",
    estimateLabel: "ESTIMATION RANGE",
    estimateMin: "",
    estimateMax: "",
    priceNote: "All prices are indicative and may vary based on project scope and requirements.",
    sections: [
      makeSection("CONTENT INCLUDED", "target"),
      makeSection("CAST", "star"),
      makeSection("STAFF", "person")
    ]
  };
}

function sampleState() {
  const essence = makeBox("ESSENCE");
  const signature = makeBox("SIGNATURE");
  signature.subtitle = "For refined, immersive experiences\nwith curated artistic depth";
  signature.sections[0].items = ["Live music set", ""];
  signature.sections[2].items = ["Creative direction", "Stage coordination", ""];

  return {
    globals: defaultGlobals(),
    rows: [[essence, signature]]
  };
}

function normalizedAssetPath(src) {
  return String(src || "").replace(/\\/g, "/").toLowerCase();
}

function isLegacyBrandMarkSrc(src) {
  const normalized = normalizedAssetPath(src);
  return (
    normalized === LOCAL_BRAND_MARK_PATH.toLowerCase() ||
    normalized.endsWith(`/${LOCAL_BRAND_MARK_PATH.toLowerCase()}`)
  );
}

function isLegacyBrandLogoSrc(src) {
  const normalized = normalizedAssetPath(src);
  if (src === DEFAULT_BRAND_LOGO || src === DEFAULT_BRAND_LOGO_TOKEN) return true;

  if (
    normalized === LOCAL_BRAND_LOGO_PATH.toLowerCase() ||
    normalized.endsWith(`/${LOCAL_BRAND_LOGO_PATH.toLowerCase()}`)
  ) {
    return true;
  }

  if (!src?.startsWith("data:image/svg+xml;base64,")) return false;
  if (typeof atob !== "function") return false;

  try {
    const svgText = atob(src.split(",")[1]);
    return (
      svgText.includes('viewBox="0 0 285.3 31.2"') ||
      svgText.includes('viewBox="0 0 285.3 14.2"')
    );
  } catch (error) {
    return false;
  }
}

function normalizeState(nextState) {
  const normalized = nextState && Array.isArray(nextState.rows)
    ? nextState
    : { globals: defaultGlobals(), rows: [[makeBox()]] };

  normalized.globals = {
    ...defaultGlobals(),
    ...(normalized.globals || {})
  };

  if (normalized.globals.templateNoteTitle === LEGACY_TEMPLATE_NOTE_TITLE) {
    normalized.globals.templateNoteTitle = DEFAULT_TEMPLATE_NOTE_TITLE;
  }

  if (normalized.globals.templateNoteBody === LEGACY_TEMPLATE_NOTE_BODY) {
    normalized.globals.templateNoteBody = DEFAULT_TEMPLATE_NOTE_BODY;
  }

  if (isLegacyBrandMarkSrc(normalized.globals.brandMarkSrc)) {
    normalized.globals.brandMarkSrc = DEFAULT_BRAND_MARK;
  }

  if (isLegacyBrandLogoSrc(normalized.globals.brandLogoSrc)) {
    normalized.globals.brandLogoSrc = DEFAULT_BRAND_LOGO_TOKEN;
  }

  if (!Array.isArray(normalized.rows) || !normalized.rows.length) {
    normalized.rows = [[makeBox()]];
  }

  normalized.rows = normalized.rows
    .filter(Array.isArray)
    .map(row => row.filter(Boolean))
    .filter(row => row.length > 0);

  normalized.rows.forEach(row => {
    row.forEach(box => {
      box.title = box.title || "ESSENCE";
      box.subtitle = box.subtitle || "";
      box.estimateLabel = box.estimateLabel || "ESTIMATION RANGE";
      box.estimateMin = normalizeEstimateValue(box.estimateMin);
      box.estimateMax = normalizeEstimateValue(box.estimateMax);
      box.priceNote = box.priceNote || "";
      box.sections = Array.isArray(box.sections) ? box.sections : [];
      box.sections.forEach(section => {
        section.icon = section.icon || "circle";
        section.items = compactBulletItems(section.items);
      });
    });
  });

  if (!normalized.rows.length) normalized.rows = [[makeBox()]];
  return normalized;
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && Array.isArray(parsed.rows)) return normalizeState(parsed);
    }
  } catch (error) {
    console.warn("Could not load saved proposal.", error);
  }
  return normalizeState({ globals: defaultGlobals(), rows: [[makeBox()]] });
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function snapshot() {
  return JSON.stringify(state);
}

function restore(serialized) {
  state = normalizeState(JSON.parse(serialized));
  persist();
  render();
}

function pushHistoryFrom(serialized) {
  if (!serialized || serialized === snapshot()) return;
  history.push(serialized);
  if (history.length > MAX_HISTORY) history.shift();
}

function pushHistory() {
  history.push(snapshot());
  if (history.length > MAX_HISTORY) history.shift();
}

function undo() {
  const previous = history.pop();
  if (!previous) return;
  restore(previous);
}

function findBox(boxId) {
  for (let rowIndex = 0; rowIndex < state.rows.length; rowIndex += 1) {
    const colIndex = state.rows[rowIndex].findIndex(box => box.id === boxId);
    if (colIndex !== -1) return { rowIndex, colIndex, box: state.rows[rowIndex][colIndex] };
  }
  return null;
}

function removeBoxFromRows(boxId) {
  let removed = null;
  state.rows = state.rows
    .map(row => {
      const nextRow = row.filter(box => {
        if (box.id === boxId) {
          removed = box;
          return false;
        }
        return true;
      });
      return nextRow;
    })
    .filter(row => row.length > 0);
  return removed;
}

function sanitizeRows() {
  if (!state.rows.length) state.rows = [[makeBox()]];
}

function setGlobalText() {
  document.querySelectorAll("[data-global-field]").forEach(element => {
    const field = element.dataset.globalField;
    if (field in state.globals) element.textContent = state.globals[field];
  });
}

function decodeSvgDataUrl(src) {
  if (!src?.startsWith("data:image/svg+xml")) return "";

  try {
    const [, data = ""] = src.split(",");
    if (src.includes(";base64,")) return atob(data);
    return decodeURIComponent(data);
  } catch (error) {
    console.warn("Could not decode SVG asset.", error);
    return "";
  }
}

function inlineSvgFromDataUrl(src, field) {
  const svgText = decodeSvgDataUrl(src);
  if (!svgText) return null;

  const parsed = new DOMParser().parseFromString(svgText, "image/svg+xml");
  const svg = parsed.documentElement;
  if (!svg || svg.nodeName.toLowerCase() !== "svg" || svg.querySelector("parsererror")) return null;

  svg.removeAttribute("width");
  svg.removeAttribute("height");
  svg.classList.add("asset-svg");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  svg.setAttribute("preserveAspectRatio", field === "brandLogoSrc" ? "xMinYMid meet" : "xMidYMid meet");
  return document.importNode(svg, true);
}

function createDefaultBrandLogo() {
  const logo = document.createElement("span");
  logo.className = "brand-logo-default";

  const name = document.createElement("span");
  name.className = "brand-logo-name";
  name.textContent = "GABRIELERIZZILAB";

  const tagline = document.createElement("span");
  tagline.className = "brand-logo-tagline";
  tagline.textContent = "HAUTE CREATIVITY";

  logo.append(name, tagline);
  return logo;
}

function renderAssetImage(field, src) {
  document.querySelectorAll(`[data-asset-image="${field}"]`).forEach(preview => {
    const button = preview.closest("[data-asset-target]");
    preview.replaceChildren();

    if (field === "brandLogoSrc" && (!src || src === DEFAULT_BRAND_LOGO_TOKEN)) {
      preview.hidden = false;
      preview.appendChild(createDefaultBrandLogo());
      if (button) button.classList.remove("has-custom-asset");
      return;
    }

    if (!src) {
      preview.hidden = true;
      if (button) button.classList.remove("has-custom-asset");
      return;
    }

    const inlineSvg = inlineSvgFromDataUrl(src, field);
    if (inlineSvg) {
      preview.hidden = false;
      preview.appendChild(inlineSvg);
      if (button) button.classList.add("has-custom-asset");
      return;
    }

    const image = document.createElement("img");
    image.src = src;
    image.alt = "";
    image.decoding = "async";
    preview.hidden = false;
    preview.appendChild(image);
    if (button) button.classList.add("has-custom-asset");
  });
}

function setGlobalAssets() {
  [
    "brandMarkSrc",
    "brandLogoSrc"
  ].forEach(field => renderAssetImage(field, state.globals[field] || ""));
}

function iconClass(icon) {
  if (["target", "star", "person", "sun"].includes(icon)) return icon;
  return "circle";
}

function svgNode(tag, attributes = {}) {
  const node = document.createElementNS("http://www.w3.org/2000/svg", tag);
  Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
  return node;
}

function createIconSvg(icon) {
  if (icon === "circle") return null;

  const svg = svgNode("svg", {
    class: "icon-svg",
    viewBox: "0 0 40 40",
    "aria-hidden": "true",
    focusable: "false"
  });

  const shapeAttributes = {
    fill: "none",
    stroke: "currentColor",
    "stroke-width": "1.3",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  };

  if (icon === "target") {
    svg.append(
      svgNode("circle", { ...shapeAttributes, cx: "20", cy: "20", r: "9.5" }),
      svgNode("circle", { ...shapeAttributes, cx: "20", cy: "20", r: "3.2" }),
      svgNode("line", { ...shapeAttributes, x1: "20", y1: "20", x2: "31.5", y2: "8.5" })
    );
  }

  if (icon === "star") {
    svg.appendChild(svgNode("path", {
      ...shapeAttributes,
      d: "M20 7.2l3.8 8.6 9.2 1-6.9 6.3 1.9 9.1-8-4.6-8 4.6 1.9-9.1L7 16.8l9.2-1L20 7.2z"
    }));
  }

  if (icon === "person") {
    svg.append(
      svgNode("circle", { ...shapeAttributes, cx: "20", cy: "14.2", r: "5.3" }),
      svgNode("path", { ...shapeAttributes, d: "M9.5 32.4c1.8-6.7 6.1-10.4 10.5-10.4s8.7 3.7 10.5 10.4" })
    );
  }

  if (icon === "sun") {
    svg.appendChild(svgNode("circle", { ...shapeAttributes, cx: "20", cy: "20", r: "2.8" }));
    [
      ["20", "7.5", "20", "12.1"],
      ["20", "27.9", "20", "32.5"],
      ["7.5", "20", "12.1", "20"],
      ["27.9", "20", "32.5", "20"],
      ["11.2", "11.2", "14.5", "14.5"],
      ["25.5", "25.5", "28.8", "28.8"],
      ["28.8", "11.2", "25.5", "14.5"],
      ["14.5", "25.5", "11.2", "28.8"],
      ["15.2", "8.8", "16.8", "13"],
      ["23.2", "27", "24.8", "31.2"],
      ["31.2", "15.2", "27", "16.8"],
      ["13", "23.2", "8.8", "24.8"]
    ].forEach(([x1, y1, x2, y2]) => {
      svg.appendChild(svgNode("line", { ...shapeAttributes, x1, y1, x2, y2 }));
    });
  }

  return svg;
}

function setIconGraphic(element, icon) {
  element.textContent = "";
  const svg = createIconSvg(iconClass(icon));
  if (svg) element.appendChild(svg);
}

function setStaticIcons() {
  document.querySelectorAll(".mini-icon").forEach(element => {
    const icon = ["target", "star", "person", "sun"].find(name => element.classList.contains(name)) || "circle";
    setIconGraphic(element, icon);
  });
}

function isTemplatePlaceholder(value) {
  return /^\[\s*add\b.*\]$/i.test(String(value || "").trim());
}

function isBlankBulletValue(value) {
  const text = String(value || "").trim();
  return !text || isTemplatePlaceholder(text);
}

function compactBulletItems(items) {
  const filledItems = (Array.isArray(items) ? items : [])
    .map(item => String(item || "").trim())
    .filter(item => !isBlankBulletValue(item));

  return [...filledItems, ""];
}

function compactSectionBullets(section) {
  const nextItems = compactBulletItems(section.items);
  const changed = JSON.stringify(section.items) !== JSON.stringify(nextItems);
  section.items = nextItems;
  return changed;
}

function normalizeEstimateValue(value) {
  const text = String(value || "").trim();
  return /^\[\s*\]$/.test(text) ? "" : text;
}

function setEditableText(element, value, placeholder = "") {
  const text = String(value || "");

  if (placeholder && !text.trim()) {
    element.dataset.placeholder = placeholder;
    element.textContent = "";
    return;
  }

  delete element.dataset.placeholder;
  element.textContent = text;
}

function createBulletItemElement(item, itemIndex) {
  const li = document.createElement("li");
  li.className = "bullet-item";
  li.dataset.itemIndex = String(itemIndex);

  const dot = document.createElement("span");
  dot.className = "bullet-dot";

  const text = document.createElement("span");
  text.className = "bullet-text";
  text.contentEditable = "true";
  text.dataset.field = "bullet";
  setEditableText(text, isBlankBulletValue(item) ? "" : item, BULLET_PLACEHOLDER);

  li.append(dot, text);
  return li;
}

function createSectionElement(box, section) {
  const sectionEl = document.createElement("section");
  sectionEl.className = "section";
  sectionEl.dataset.sectionId = section.id;

  const icon = document.createElement("div");
  const iconName = iconClass(section.icon);
  icon.className = `section-icon ${iconName}`;
  setIconGraphic(icon, iconName);
  sectionEl.appendChild(icon);

  const content = document.createElement("div");
  content.className = "section-content";

  const label = document.createElement("div");
  label.className = "section-label";
  label.contentEditable = "true";
  label.dataset.field = "sectionLabel";
  label.textContent = section.label;
  content.appendChild(label);

  const list = document.createElement("ul");
  list.className = "bullet-list";
  section.items.forEach((item, itemIndex) => {
    const li = document.createElement("li");
    li.className = "bullet-item";
    li.dataset.itemIndex = String(itemIndex);

    const dot = document.createElement("span");
    dot.className = "bullet-dot";
    dot.textContent = "•";

    const text = document.createElement("span");
    text.className = "bullet-text";
    text.contentEditable = "true";
    text.dataset.field = "bullet";

    if (isBlankBulletValue(item)) {
      text.dataset.placeholder = isTemplatePlaceholder(item) ? item : BULLET_PLACEHOLDER;
      text.textContent = "";
    } else {
      text.textContent = item;
    }

    const remove = document.createElement("button");
    remove.className = "remove-bullet";
    remove.type = "button";
    remove.title = "Remove bullet";
    remove.setAttribute("aria-label", "Remove bullet");
    remove.textContent = "×";

    li.append(dot, text, remove);
    list.appendChild(li);
  });

  const addBullet = document.createElement("button");
  addBullet.className = "add-bullet";
  addBullet.type = "button";
  addBullet.title = "Add bullet";
  addBullet.setAttribute("aria-label", "Add bullet");
  addBullet.textContent = "+";

  content.append(list, addBullet);
  sectionEl.appendChild(content);
  return sectionEl;
}

function render() {
  setGlobalText();
  setGlobalAssets();
  setStaticIcons();
  grid.innerHTML = "";

  state.rows.forEach((row, rowIndex) => {
    const rowEl = document.createElement("div");
    rowEl.className = "grid-row";
    rowEl.dataset.rowIndex = String(rowIndex);
    rowEl.style.gridTemplateColumns = `repeat(${row.length}, minmax(min(var(--card-min), 100%), 1fr))`;

    row.forEach(box => {
      const card = cardTemplate.content.firstElementChild.cloneNode(true);
      card.dataset.boxId = box.id;
      card.querySelector(".drag-handle")?.removeAttribute("draggable");
      card.querySelector('[data-field="title"]').textContent = box.title;
      card.querySelector('[data-field="subtitle"]').textContent = box.subtitle;
      card.querySelector('[data-field="estimateLabel"]').textContent = box.estimateLabel;
      setEditableText(card.querySelector('[data-field="estimateMin"]'), box.estimateMin, ESTIMATE_PLACEHOLDER);
      setEditableText(card.querySelector('[data-field="estimateMax"]'), box.estimateMax, ESTIMATE_PLACEHOLDER);
      card.querySelector('[data-field="priceNote"]').textContent = box.priceNote;

      const sectionsEl = card.querySelector(".sections");
      box.sections.forEach(section => sectionsEl.appendChild(createSectionElement(box, section)));

      rowEl.appendChild(card);
    });

    grid.appendChild(rowEl);
  });
}

function updateField(target) {
  const globalField = target.dataset.globalField;
  if (globalField) {
    state.globals[globalField] = target.textContent.trim();
    persist();
    return;
  }

  const card = target.closest(".proposal-card");
  if (!card) return;
  const found = findBox(card.dataset.boxId);
  if (!found) return;

  const field = target.dataset.field;
  if (["title", "subtitle", "estimateLabel", "estimateMin", "estimateMax", "priceNote"].includes(field)) {
    const value = target.textContent.trim();
    found.box[field] = ["estimateMin", "estimateMax"].includes(field) ? normalizeEstimateValue(value) : value;
    persist();
    return;
  }

  const sectionEl = target.closest(".section");
  if (!sectionEl) return;
  const section = found.box.sections.find(item => item.id === sectionEl.dataset.sectionId);
  if (!section) return;

  if (field === "sectionLabel") {
    section.label = target.textContent.trim();
  }

  if (field === "bullet") {
    const bulletItem = target.closest(".bullet-item");
    const index = Number(bulletItem.dataset.itemIndex);
    const value = target.textContent.trim();
    section.items[index] = value;

    if (value && index === section.items.length - 1) {
      section.items.push("");
      persist();
      return { action: "appendBullet", itemIndex: section.items.length - 1 };
    }
  }

  persist();
}

function appendBlankBulletElement(target, itemIndex) {
  const list = target.closest(".bullet-list");
  if (!list || list.querySelector(`.bullet-item[data-item-index="${itemIndex}"]`)) return;
  list.appendChild(createBulletItemElement("", itemIndex));
}

function compactBulletsForTarget(target) {
  if (target.dataset.field !== "bullet") return false;

  const card = target.closest(".proposal-card");
  if (!card) return false;
  const found = findBox(card.dataset.boxId);
  if (!found) return false;

  const sectionEl = target.closest(".section");
  if (!sectionEl) return false;
  const section = found.box.sections.find(item => item.id === sectionEl.dataset.sectionId);
  if (!section) return false;

  return compactSectionBullets(section);
}

function restoreEmptyPlaceholder(target) {
  if (target.textContent.trim()) return;

  if (target.dataset.field === "bullet") {
    setEditableText(target, "", target.dataset.placeholder || BULLET_PLACEHOLDER);
  }

  if (["estimateMin", "estimateMax"].includes(target.dataset.field)) {
    setEditableText(target, "", ESTIMATE_PLACEHOLDER);
  }
}

function addBoxNear(boxId, side) {
  const found = findBox(boxId);
  if (!found) return;
  pushHistory();

  const box = makeBox("NEW OPTION");

  if (side === "left") {
    state.rows[found.rowIndex].splice(found.colIndex, 0, box);
  } else if (side === "right") {
    state.rows[found.rowIndex].splice(found.colIndex + 1, 0, box);
  } else if (side === "top") {
    state.rows.splice(found.rowIndex, 0, [box]);
  } else if (side === "bottom") {
    state.rows.splice(found.rowIndex + 1, 0, [box]);
  }

  persist();
  render();
}

function deleteBox(boxId) {
  pushHistory();
  removeBoxFromRows(boxId);
  sanitizeRows();
  persist();
  render();
}

function addBullet(boxId, sectionId) {
  const found = findBox(boxId);
  if (!found) return;
  const section = found.box.sections.find(item => item.id === sectionId);
  if (!section) return;
  pushHistory();
  section.items.push("");
  persist();
  render();
}

function removeBullet(boxId, sectionId, itemIndex) {
  const found = findBox(boxId);
  if (!found) return;
  const section = found.box.sections.find(item => item.id === sectionId);
  if (!section) return;
  pushHistory();
  section.items.splice(itemIndex, 1);
  if (!section.items.length) section.items.push("");
  persist();
  render();
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", () => reject(reader.error));
    reader.readAsDataURL(file);
  });
}

function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", () => reject(reader.error));
    reader.readAsText(file);
  });
}

function isSupportedAsset(file) {
  return (
    ["image/svg+xml", "image/png", "image/jpeg", "image/webp"].includes(file.type) ||
    /\.(svg|png|jpe?g|webp)$/i.test(file.name)
  );
}

function openAssetPicker(target) {
  pendingAssetTarget = target;
  assetUploadInput.value = "";
  assetUploadInput.click();
}

async function applyAssetUpload(file) {
  if (!file || !pendingAssetTarget) return;

  if (!isSupportedAsset(file)) {
    alert("Please choose an SVG, PNG, JPG, or WebP file.");
    return;
  }

  const src = await readFileAsDataUrl(file);
  pushHistory();

  if (pendingAssetTarget.type === "global") {
    state.globals[pendingAssetTarget.field] = src;
  }

  pendingAssetTarget = null;
  persist();
  render();
}

function moveBoxBefore(draggedId, targetId) {
  if (!draggedId || draggedId === targetId) return;
  const target = findBox(targetId);
  if (!target) return;

  pushHistory();
  const moved = removeBoxFromRows(draggedId);
  if (!moved) return;

  const refreshedTarget = findBox(targetId);
  if (!refreshedTarget) return;
  state.rows[refreshedTarget.rowIndex].splice(refreshedTarget.colIndex, 0, moved);
  sanitizeRows();
  persist();
  render();
}

function waitForImages(root) {
  const images = Array.from(root.querySelectorAll("img")).filter(image => !image.complete);

  return Promise.all(images.map(image => new Promise(resolve => {
    image.addEventListener("load", resolve, { once: true });
    image.addEventListener("error", resolve, { once: true });
  })));
}

function exportFileName() {
  const title = (state.globals.documentTitle || "proposal")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${title || "proposal"}-${new Date().toISOString().slice(0, 10)}.png`;
}

function projectFileName() {
  const title = (state.globals.documentTitle || "proposal")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${title || "proposal"}-${new Date().toISOString().slice(0, 10)}.grl-proposal.json`;
}

function downloadProjectFile() {
  const project = {
    app: "gabrielerizzilab-proposal-builder",
    version: PROJECT_FILE_VERSION,
    savedAt: new Date().toISOString(),
    state
  };
  const blob = new Blob([JSON.stringify(project, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = projectFileName();
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function readProjectState(payload) {
  const parsed = JSON.parse(payload);
  const projectState = parsed?.state && Array.isArray(parsed.state.rows) ? parsed.state : parsed;
  if (!projectState || !Array.isArray(projectState.rows)) {
    throw new Error("Invalid proposal project file.");
  }
  return normalizeState(projectState);
}

async function loadProjectFile(file) {
  if (!file) return;
  const text = await readFileAsText(file);
  const nextState = readProjectState(text);
  pushHistory();
  state = nextState;
  persist();
  render();
}

async function canvasToBlob(canvas) {
  const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png", 1));
  if (!blob) throw new Error("Could not create the image file.");
  return blob;
}

async function downloadImage() {
  if (!window.html2canvas) {
    alert("The image export tool is still loading. Please try again in a moment.");
    return;
  }

  const previousLabel = exportButton.textContent;
  exportButton.disabled = true;
  exportButton.textContent = "Preparing...";
  document.body.classList.add("is-exporting");

  try {
    if (document.fonts?.ready) await document.fonts.ready;
    const exportElement = document.querySelector(".app-shell");
    await waitForImages(exportElement);
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

    const canvas = await window.html2canvas(exportElement, {
      backgroundColor: "#3f6583",
      scale: Math.max(3, Math.min(4, window.devicePixelRatio || 1)),
      useCORS: true,
      allowTaint: false,
      windowWidth: exportElement.scrollWidth,
      windowHeight: exportElement.scrollHeight,
      scrollX: 0,
      scrollY: 0
    });

    const blob = await canvasToBlob(canvas);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = exportFileName();
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } finally {
    document.body.classList.remove("is-exporting");
    exportButton.disabled = false;
    exportButton.textContent = previousLabel;
  }
}

function clearDragOver() {
  document.querySelectorAll(".drag-over").forEach(card => card.classList.remove("drag-over"));
}

function updateDragGhost(event) {
  if (!dragState) return;

  dragState.ghost.style.left = `${event.clientX - dragState.offsetX}px`;
  dragState.ghost.style.top = `${event.clientY - dragState.offsetY}px`;
}

function targetCardAtPoint(event) {
  const element = document.elementFromPoint(event.clientX, event.clientY);
  return element?.closest(".proposal-card") || null;
}

function cleanupDrag() {
  if (!dragState) return;

  dragState.sourceCard.classList.remove("drag-source");
  dragState.ghost.remove();
  dragState = null;
  clearDragOver();
  document.body.classList.remove("is-dragging-card");
  document.removeEventListener("pointermove", handlePointerDrag);
  document.removeEventListener("pointerup", finishPointerDrag);
  document.removeEventListener("pointercancel", cancelPointerDrag);
}

function handlePointerDrag(event) {
  if (!dragState) return;

  event.preventDefault();
  updateDragGhost(event);
  clearDragOver();

  const card = targetCardAtPoint(event);

  if (card && card.dataset.boxId !== dragState.boxId) {
    card.classList.add("drag-over");
    dragState.targetId = card.dataset.boxId;
  } else {
    dragState.targetId = null;
  }
}

function finishPointerDrag(event) {
  if (!dragState) return;

  event.preventDefault();
  const { boxId, targetId } = dragState;
  cleanupDrag();

  if (targetId) moveBoxBefore(boxId, targetId);
}

function cancelPointerDrag() {
  cleanupDrag();
}

function startPointerDrag(event) {
  const handle = event.target.closest(".drag-handle");
  if (!handle || event.button !== 0) return;

  const sourceCard = handle.closest(".proposal-card");
  if (!sourceCard) return;

  event.preventDefault();

  const rect = sourceCard.getBoundingClientRect();
  const ghost = sourceCard.cloneNode(true);
  ghost.classList.add("drag-ghost");
  ghost.classList.remove("drag-over");
  ghost.style.width = `${rect.width}px`;
  ghost.style.height = `${rect.height}px`;
  ghost.querySelectorAll(".side-add, .drag-handle, .remove-card, .add-bullet, .remove-bullet").forEach(control => {
    control.style.display = "none";
  });
  document.body.appendChild(ghost);

  dragState = {
    boxId: sourceCard.dataset.boxId,
    sourceCard,
    ghost,
    offsetX: event.clientX - rect.left,
    offsetY: event.clientY - rect.top,
    targetId: null
  };

  sourceCard.classList.add("drag-source");
  document.body.classList.add("is-dragging-card");
  updateDragGhost(event);

  document.addEventListener("pointermove", handlePointerDrag);
  document.addEventListener("pointerup", finishPointerDrag);
  document.addEventListener("pointercancel", cancelPointerDrag);
}

function closestCardFromEvent(event) {
  return event.target.closest(".proposal-card");
}

document.addEventListener("click", event => {
  const assetButton = event.target.closest("[data-asset-target]");

  if (assetButton) {
    openAssetPicker({ type: "global", field: assetButton.dataset.assetTarget });
  }
});

grid.addEventListener("click", event => {
  const card = closestCardFromEvent(event);
  if (!card) return;
  const boxId = card.dataset.boxId;

  const sideButton = event.target.closest(".side-add");
  if (sideButton) {
    addBoxNear(boxId, sideButton.dataset.side);
    return;
  }

  if (event.target.closest(".remove-card")) {
    deleteBox(boxId);
    return;
  }

  const addBulletButton = event.target.closest(".add-bullet");
  if (addBulletButton) {
    const section = addBulletButton.closest(".section");
    addBullet(boxId, section.dataset.sectionId);
    return;
  }

  const removeBulletButton = event.target.closest(".remove-bullet");
  if (removeBulletButton) {
    const section = removeBulletButton.closest(".section");
    const item = removeBulletButton.closest(".bullet-item");
    removeBullet(boxId, section.dataset.sectionId, Number(item.dataset.itemIndex));
  }
});

assetUploadInput.addEventListener("change", event => {
  applyAssetUpload(event.target.files[0]).catch(error => {
    console.error("Could not load asset.", error);
    alert("That asset could not be loaded.");
  });
});

saveProjectButton.addEventListener("click", downloadProjectFile);

loadProjectButton.addEventListener("click", () => {
  projectLoadInput.value = "";
  projectLoadInput.click();
});

projectLoadInput.addEventListener("change", event => {
  loadProjectFile(event.target.files[0]).catch(error => {
    console.error("Could not load project.", error);
    alert("That project file could not be loaded.");
  });
});

document.addEventListener("input", event => {
  if (!event.target.matches('[contenteditable="true"]')) return;
  const result = updateField(event.target);
  if (result?.action === "appendBullet") appendBlankBulletElement(event.target, result.itemIndex);
});

document.addEventListener("focusin", event => {
  if (event.target.matches('[contenteditable="true"]')) activeEditSnapshot = snapshot();
});

document.addEventListener("focusout", event => {
  if (!event.target.matches('[contenteditable="true"]')) return;
  const shouldRender = compactBulletsForTarget(event.target);
  restoreEmptyPlaceholder(event.target);
  if (shouldRender) persist();
  pushHistoryFrom(activeEditSnapshot);
  activeEditSnapshot = null;
  if (shouldRender) render();
});

document.addEventListener("keydown", event => {
  const isUndo = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z";
  if (!isUndo) return;
  event.preventDefault();
  undo();
});

grid.addEventListener("pointerdown", startPointerDrag);

exportButton.addEventListener("click", () => {
  downloadImage().catch(error => {
    console.error("Could not export image.", error);
    alert("The image could not be created. Please check that the page has finished loading and try again.");
  });
});

render();

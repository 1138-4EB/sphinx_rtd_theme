# Build the Docs Sphinx Theme

This [Sphinx](http://www.sphinx-doc.org/) theme is a *soft* fork of [Read the Docs Sphinx Theme](https://github.com/readthedocs/sphinx_rtd_theme). Although it is claimed in the [README.rst](https://github.com/readthedocs/sphinx_rtd_theme/blob/master/README.rst) of the upstream theme that it can be used with any Sphinx project, in practice it is not straightforward to do so:

> "*I'm -1 on these changes from a product perspective. I don't want to further generalize our theme (...)*" - [sphinx_rtd_theme#574](https://github.com/readthedocs/sphinx_rtd_theme/pull/574#issuecomment-368981832)
>
> "*(...) we don't want to support build tools that aren't Read the Docs with our theme, (...)*" - [readthedocs/sphinx_rtd_theme#578](https://github.com/readthedocs/sphinx_rtd_theme/pull/578#issuecomment-368992745)
>
> "*(...) we don't support installs or doing builds on any third party platform (...)*" - [readthedocs/readthedocs-build#35](https://github.com/readthedocs/readthedocs-build/issues/35#issuecomment-353999374)

Therefore, this fork includes modifications to allow the list of versions to be loaded from a `versions.json` file, instead of depending on RTD's Javascript injection. At the same time, code specific to RTD is removed, and a bunch of enhancements is included:

- Justify text in paragraphs and list items.
- Center the body (main content).
- Rework 'Previous' and 'Next' buttons.
- Replace *complex* RTD versions menu with a dropdown menu in the sidebar title.
- Show both 'View' and 'Edit' buttons.
- Move theme notice from footer to bottom of the sidebar.
- Add optional 'Home' different from the master document. Show it in the sidebar and in the breadcrumbs.
- Optional field `custom_last` is added to the footer.
- Optional field `last_info` is shown in the header.

## Installation

Unlike the upstream theme, this BTD theme is NOT distributed as a PyPI package. Users need to get subdir `dist` of this repo through the tool or package manager of their choice.

git
curl/wget + tar
npm, yarn, go

Then, set it in the `conf.py` file:

```py
html_theme_path = ['.']
html_theme = '_theme'

html_context = {
    'description': 'A test framework for HDL',
    'use_gfonts': True,
    'display_github': True,
    'slug_user': 'VUnit',
    'slug_repo': 'vunit',
    'slug_path': 'master/docs/',
    'current_version': 'master',
    'copyright_extra': ' - <a href="mailto:vunitframework@gmail.com">VUnitFramework</a>',
}

ctx = join(dirname(__file__), 'context.json')
if isfile(ctx):
    html_context.update(loads(open(ctx).read()))

html_theme_options = {
    'style_nav_header_background': '#0c479dff',
    'logo_only': True,
    'home_breadcrumbs': False,
    #'home_logo': False,
    'prevnext_location': 'bottom'
}
```

```py
html_theme_path = ['.']
html_theme = "_theme"

html_context = {
    'description': 'Open-source analyzer, compiler and simulator for VHDL',
    'use_gfonts': True,
    'display_github': True,
    'slug_user': 'ghdl',
    'slug_repo': 'ghdl',
    'slug_path': '%s/doc/' % ('master' if version[-4:] == '-dev' else 'v'+ver)
}

ctx = join(dirname(__file__), 'context.json')
if isfile(ctx):
    html_context.update(json.loads(open(ctx).read()))

html_theme_options = {
    #'style_nav_header_background': '#0c479dff',
    'logo_only': True,
    'home_breadcrumbs': False,
    'prevnext_location': 'bottom',
    'display_version': True,
    'homepath': '/ghdl'
}
```

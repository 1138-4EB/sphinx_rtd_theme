***************************
Build the Docs Sphinx Theme
***************************

To use this theme in your Sphinx project, extract the content to a dir, say ``_theme``, and set variables
``html_theme_path`` and ``html_theme`` in the `conf.py` file. For example:

.. code:: python

    html_theme_path = ["."]
    html_theme = '_theme'

This theme is highly customizable on both the page level and on a global level.
To see all the possible configuration options, read the documentation on
`configuring the theme`_.

If you would like to help modify or translate the theme, you'll find more
information on contributing in our `contributing guide`_.

.. _configuring the theme: https://buildthedocs.github.io/sphinx.theme/configuring.html
.. _contributing guide: https://buildthedocs.github.io/sphinx.theme/contributing.html

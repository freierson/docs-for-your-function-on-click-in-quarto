# thanks to https://github.com/fleverest for writing the key part of this function
get_doc_md <- function(fn) {
  mod <- substitute(fn) |>
    box:::help_topic_target(parent.frame()) |>
      `[[`(x = _, 1L)
    box:::parse_documentation(attr(mod, "info"), attr(mod, "namespace")) |>
    lapply(\(x) x |>  
             Rd2md::rd_str_to_md(fragment = F,section_level=4) |>
             gsub("^####\\s+(.*?)\n\n", "### `\\1`", x=_, perl=F) |>
             gsub("#### Alias\n.*?####", ":", x=_, perl=F))
}
cat_documentation <- function(docx,hide=T) {
  for (fun in names(docs)) {
    if(hide)
      cat('<div class="collapse">\n')
    else
      cat('<div>\n')
    cat(paste0('::: {#documentation-', fun, '}\n'))
    cat(docs[[fun]])
    cat(':::\n')
    cat('</div>\n')
  }
  cat('<script src="docs-on-click.js"></script>\n')
}

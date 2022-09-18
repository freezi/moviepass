export const getIndex = (req, res) => {
  if (req.user) {
    res.redirect("/lists");
  } else res.render("index.ejs");
};

export const getChangelog = (req, res) => {
  res.render("changelog.ejs");
};

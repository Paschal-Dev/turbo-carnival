import { useState, type SetStateAction } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  TextField,
  useTheme,
  useMediaQuery,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  AppBar,
  Tabs,
  Tab,
  Avatar,
  // Fab
} from "@mui/material";
import {
  SportsSoccer,
  School,
  Event,
  Groups,
  MenuBook,
  ThumbUp,
  // Share,
  Comment,
  Close,
  // Add,
  Facebook,
  Twitter,
  LinkedIn,
  // Instagram
} from "@mui/icons-material";
import { posts } from "../../data/posts";

const BlogSection = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only("xs"));
  const [postList] = useState(posts);
  const [comment, setComment] = useState("");
  type Post = (typeof posts)[number];
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  type CommentType = {
    id: string;
    text: string;
    user: string;
    created_at: string;
    avatar: string;
  };
  const [comments, setComments] = useState<Record<string, CommentType[]>>({});
  const [likes, setLikes] = useState<Record<string, number>>({});

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleOpenDialog = (
    post: SetStateAction<{
      id: string;
      title: string;
      excerpt: string;
      image: string;
      date: string;
      category: string;
      readTime: string;
      featured: boolean;
    } | null>
  ) => {
    setSelectedPost(post);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPost(null);
  };

  const handleCommentSubmit = (postId: string) => {
    if (!comment.trim()) return;
    const newComment = {
      id: `${postId}-${Date.now()}`,
      text: comment,
      user: "Anonymous",
      created_at: new Date().toISOString(),
      avatar: "/static/images/avatar/1.jpg",
    };
    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment],
    }));
    setComment("");
  };

  const handleLike = (postId: string) => {
    setLikes((prev) => ({
      ...prev,
      [postId]: (prev[postId] || 0) + 1,
    }));
  };

  const handleShare = (postId: string, platform: string) => {
    const post = postList.find((p) => p.id === postId);
    if (!post) return;
    const shareUrl = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this post: ${post.title}`);

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    };

    window.open(shareUrls[platform as keyof typeof shareUrls], "_blank");
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Sports":
        return <SportsSoccer fontSize="small" />;
      case "Academics":
        return <School fontSize="small" />;
      case "Events":
        return <Event fontSize="small" />;
      case "Student Life":
        return <Groups fontSize="small" />;
      default:
        return <MenuBook fontSize="small" />;
    }
  };

  const filteredPosts =
    activeTab === 0
      ? postList
      : postList.filter(
          (post) =>
            post.category.toLowerCase() ===
            ["all", "sports", "academics", "events"][activeTab]?.toLowerCase()
        );

  return (
    <Box
      sx={{
        py: mobile ? 6 : 10,
        bgcolor: "background.default",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
      id="blog"
    >
      <Container>
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          sx={{
            mb: 3,
            color: "primary.main",
            fontSize: mobile ? "2rem" : "3rem",
            fontWeight: 900,
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          Our Blog Posts
        </Typography>

        <Typography
          variant="h6"
          align="center"
          sx={{
            mb: 6,
            color: "text.secondary",
            maxWidth: "600px",
            mx: "auto",
            fontSize: mobile ? "1rem" : "1.2rem",
          }}
        >
          Stay updated with the latest happenings, achievements, and events at
          Gold Stream Academy
        </Typography>

        {/* Category Tabs */}
        <AppBar
          position="static"
          sx={{
            bgcolor: "transparent",
            boxShadow: "none",
            mb: 4,
            borderBottom: "2px solid",
            borderColor: "primary.main",
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTab-root": {
                color: "text.primary",
                fontSize: mobile ? "0.8rem" : "1rem",
                fontWeight: 600,
                minWidth: "auto",
                px: 3,
                "&.Mui-selected": {
                  color: "primary.main",
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "primary.main",
                height: 3,
              },
            }}
          >
            <Tab label="All Posts" />
            <Tab label="Sports" />
            <Tab label="Academics" />
            <Tab label="Events" />
          </Tabs>
        </AppBar>

        {/* Blog Posts Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
            gap: 4,
            mb: 6,
          }}
        >
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
                borderRadius: 3,
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                border: "1px solid",
                borderColor: "rgba(255,255,255,0.5)",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 16px 48px rgba(0,0,0,0.15)",
                  borderColor: "primary.main",
                },
              }}
            >
              <Box sx={{ position: "relative", overflow: "hidden" }}>
                <CardMedia
                  component="img"
                  height="220"
                  src={post.image}
                  alt={post.title}
                  sx={{
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  {post.featured && (
                    <Chip
                      label="Featured"
                      color="primary"
                      size="small"
                      sx={{
                        fontWeight: "bold",
                        bgcolor: "primary.main",
                        color: "white",
                      }}
                    />
                  )}
                  <Chip
                    icon={getCategoryIcon(post.category)}
                    label={post.category}
                    size="small"
                    sx={{
                      bgcolor: "rgba(255,255,255,0.9)",
                      backdropFilter: "blur(10px)",
                      fontWeight: "bold",
                    }}
                  />
                </Box>
              </Box>

              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    display: "block",
                    mb: 2,
                    fontSize: "0.8rem",
                    fontWeight: 500,
                  }}
                >
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                  {" • "}
                  {post.readTime}
                </Typography>

                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  sx={{
                    mb: 2,
                    color: "primary.main",
                    fontWeight: 700,
                    lineHeight: 1.3,
                    fontSize: mobile ? "1.1rem" : "1.3rem",
                    cursor: "pointer",
                    "&:hover": {
                      color: "secondary.main",
                    },
                  }}
                  onClick={() => handleOpenDialog(post)}
                >
                  {post.title}
                </Typography>

                <Typography
                  paragraph
                  sx={{
                    mb: 3,
                    color: "text.secondary",
                    lineHeight: 1.6,
                    fontSize: "0.95rem",
                  }}
                >
                  {post.excerpt}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleLike(post.id)}
                      sx={{ color: "primary.main" }}
                    >
                      <ThumbUp fontSize="small" />
                      <Typography variant="body2" sx={{ ml: 0.5 }}>
                        {likes[post.id] || 0}
                      </Typography>
                    </IconButton>

                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(post)}
                      sx={{ color: "primary.main" }}
                    >
                      <Comment fontSize="small" />
                      <Typography variant="body2" sx={{ ml: 0.5 }}>
                        {(comments[post.id] || []).length}
                      </Typography>
                    </IconButton>
                  </Box>

                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleOpenDialog(post)}
                    sx={{
                      borderRadius: 2,
                      px: 3,
                      fontWeight: "bold",
                      bgcolor: "primary.main",
                      "&:hover": {
                        bgcolor: "secondary.main",
                      },
                    }}
                  >
                    Read More
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* View All Button */}
        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            sx={{
              px: 6,
              py: 1.5,
              borderRadius: 3,
              fontWeight: "bold",
              borderWidth: 2,
              fontSize: "1.1rem",
              "&:hover": {
                borderWidth: 2,
                bgcolor: "primary.main",
                color: "white",
              },
            }}
          >
            View All Articles
          </Button>
        </Box>

        {/* Post Detail Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 3,
              background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
            },
          }}
        >
          <DialogTitle
            sx={{
              bgcolor: "primary.main",
              color: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              {selectedPost?.title}
            </Typography>
            <IconButton onClick={handleCloseDialog} sx={{ color: "white" }}>
              <Close />
            </IconButton>
          </DialogTitle>

          <DialogContent sx={{ p: 4 }}>
            {selectedPost && (
              <>
                <Box sx={{ mb: 3 }}>
                  <CardMedia
                    component="img"
                    height="300"
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    sx={{
                      borderRadius: 2,
                      objectFit: "cover",
                      mb: 3,
                    }}
                  />

                  <Box
                    sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}
                  >
                    <Chip
                      icon={getCategoryIcon(selectedPost.category)}
                      label={selectedPost.category}
                      color="primary"
                      variant="outlined"
                    />
                    <Typography variant="body2" color="text.secondary">
                      {new Date(selectedPost.date).toLocaleDateString()} •{" "}
                      {selectedPost.readTime}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body1"
                    paragraph
                    sx={{ lineHeight: 1.8, mb: 3 }}
                  >
                    {selectedPost.excerpt}
                  </Typography>

                  {/* Special content for Olympiad post */}
                  {selectedPost.id === "7" && (
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ color: "primary.main", mt: 3 }}
                      >
                        Event Details
                      </Typography>
                      <Typography
                        variant="body1"
                        paragraph
                        sx={{ lineHeight: 1.8 }}
                      >
                        Primary schools are invited to represent their
                        institutions at the inaugural Gold Stream Olympiad,
                        taking place from October 27th to November 8th, 2025
                        across multiple locations:
                      </Typography>

                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ color: "primary.main", mt: 3 }}
                      >
                        Locations
                      </Typography>
                      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
                        <li>
                          <Typography variant="body1">
                            Bayelsa - Swimming events
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="body1">
                            Delta - Swimming events
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="body1">
                            Lagos - All other events
                          </Typography>
                        </li>
                      </ul>

                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ color: "primary.main", mt: 3 }}
                      >
                        Sports Events
                      </Typography>
                      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
                        <li>
                          <Typography variant="body1">Track & Field</Typography>
                        </li>
                        <li>
                          <Typography variant="body1">Table Tennis</Typography>
                        </li>
                        <li>
                          <Typography variant="body1">Lawn Tennis</Typography>
                        </li>
                        <li>
                          <Typography variant="body1">Football</Typography>
                        </li>
                        <li>
                          <Typography variant="body1">Basketball</Typography>
                        </li>
                        <li>
                          <Typography variant="body1">Swimming</Typography>
                        </li>
                      </ul>

                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ color: "primary.main", mt: 3 }}
                      >
                        Arts Events
                      </Typography>
                      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
                        <li>
                          <Typography variant="body1">
                            Singing (5 Categories)
                          </Typography>
                        </li>
                        <li>
                          <Typography variant="body1">Dancing</Typography>
                        </li>
                        <li>
                          <Typography variant="body1">Poetry</Typography>
                        </li>
                        <li>
                          <Typography variant="body1">MC/DJ skills</Typography>
                        </li>
                        <li>
                          <Typography variant="body1">
                            Instrumental Music
                          </Typography>
                        </li>
                      </ul>

                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ color: "primary.main", mt: 3 }}
                      >
                        Grant Opportunities
                      </Typography>
                      <Typography
                        variant="body1"
                        paragraph
                        sx={{ lineHeight: 1.8 }}
                      >
                        Winning schools will receive special grant opportunities
                        to support their sports and arts programs.
                      </Typography>

                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ color: "primary.main", mt: 3 }}
                      >
                        Registration
                      </Typography>
                      <Typography
                        variant="body1"
                        paragraph
                        sx={{ lineHeight: 1.8 }}
                      >
                        Registration is closing soon! Contact us at 09013612454
                        to register your school.
                      </Typography>

                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ color: "primary.main", mt: 3 }}
                      >
                        Powered By
                      </Typography>
                      <Typography
                        variant="body1"
                        paragraph
                        sx={{ lineHeight: 1.8 }}
                      >
                        DIMENSIONAL FRONTIERS & EXPOSURES LTD
                        <br />
                        CIO Charles Edelt
                        <br />
                        S11, Second Floor, Ozde Plaza, 22 Osolo Way
                        <br />
                        Off MM International Airport Road, Ajao Estate, Lagos
                        <br />
                        Tel: +234 (0)9160009555, +234 (0)9013612454
                        <br />
                        Email: info@goldstreamacademy.com
                        <br />
                        Website: www.goldstreamacademy.com
                      </Typography>
                    </Box>
                  )}

                  {/* Regular content for other posts */}
                  {selectedPost.id !== "7" && (
                    <Typography
                      variant="body1"
                      paragraph
                      sx={{ lineHeight: 1.8, mb: 3 }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris.
                    </Typography>
                  )}

                  <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
                    <IconButton
                      onClick={() => handleShare(selectedPost.id, "facebook")}
                    >
                      <Facebook color="primary" />
                    </IconButton>
                    <IconButton
                      onClick={() => handleShare(selectedPost.id, "twitter")}
                    >
                      <Twitter color="primary" />
                    </IconButton>
                    <IconButton
                      onClick={() => handleShare(selectedPost.id, "linkedin")}
                    >
                      <LinkedIn color="primary" />
                    </IconButton>
                  </Box>
                </Box>

                {/* Comments Section remains the same */}
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Comments ({(comments[selectedPost.id] || []).length})
                  </Typography>

                  {(comments[selectedPost.id] || []).map((cmt) => (
                    <Box
                      key={cmt.id}
                      sx={{
                        display: "flex",
                        gap: 2,
                        mb: 2,
                        p: 2,
                        bgcolor: "rgba(0,0,0,0.02)",
                        borderRadius: 2,
                      }}
                    >
                      <Avatar src={cmt.avatar} />
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {cmt.user}
                        </Typography>
                        <Typography variant="body2">{cmt.text}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(cmt.created_at).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                  ))}

                  <Box sx={{ mt: 3 }}>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Add a comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      variant="outlined"
                      sx={{ mb: 2 }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleCommentSubmit(selectedPost.id)}
                      sx={{ borderRadius: 2 }}
                    >
                      Post Comment
                    </Button>
                  </Box>
                </Box>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Floating Action Button */}
        {/* <Fab
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            bgcolor: 'primary.main',
            '&:hover': {
              bgcolor: 'secondary.main'
            }
          }}
        >
          <Add />
        </Fab> */}
      </Container>
    </Box>
  );
};

export default BlogSection;

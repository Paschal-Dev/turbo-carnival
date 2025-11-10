/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
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
} from "@mui/material";
import {
  // SportsSoccer,
  // School,
  // Event,
  // Groups,
  // MenuBook,
  ThumbUp,
  Comment,
  Close,
  Facebook,
  Twitter,
  LinkedIn,
} from "@mui/icons-material";
import { posts } from "../../data/posts";

const BlogSection = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only("xs"));
  const [postList] = useState(posts);
  const [comment, setComment] = useState("");
  const [selectedPost, setSelectedPost] = useState<(typeof posts)[number] | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [comments, setComments] = useState<Record<string, any[]>>({});
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [loadingText, setLoadingText] = useState("updating.");

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((prev) =>
        prev === "updating." ? "updating.." : prev === "updating.." ? "updating..." : "updating."
      );
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => setActiveTab(newValue);

  const handleOpenDialog = (post: any) => {
    if (post.id !== "7") return; // Only Olympiad active
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
    if (postId !== "7") return;
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

  // const getCategoryIcon = (category: string) => {
  //   switch (category) {
  //     case "Sports": return <SportsSoccer fontSize="small" />;
  //     case "Academics": return <School fontSize="small" />;
  //     case "Events": return <Event fontSize="small" />;
  //     case "Student Life": return <Groups fontSize="small" />;
  //     default: return <MenuBook fontSize="small" />;
  //   }
  // };

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

        {/* Tabs */}
        <AppBar position="static" sx={{ bgcolor: "transparent", boxShadow: "none", mb: 4, borderBottom: "2px solid", borderColor: "primary.main" }}>
          <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto"
            sx={{
              "& .MuiTab-root": {
                color: "text.primary",
                fontWeight: 600,
                "&.Mui-selected": { color: "primary.main" },
              },
              "& .MuiTabs-indicator": { backgroundColor: "primary.main", height: 3 },
            }}>
            <Tab label="All Posts" /><Tab label="Sports" /><Tab label="Academics" /><Tab label="Events" />
          </Tabs>
        </AppBar>

        {/* Cards */}
        <Box sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
          gap: 4,
        }}>
          {filteredPosts.map((post, index) => {
            const isOlympiad = post.id === "7";
            const overlayColor = index % 2 === 0 ? "rgba(0,0,0,0.95)" : theme.palette.primary.main;
            return (
              <Card key={post.id}
                sx={{
                  height: "100%",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  ...(isOlympiad
                    ? { "&:hover": { transform: "translateY(-8px)" } }
                    : {}),
                }}>
                <CardMedia component="img" height="220" src={post.image} alt={post.title} />
                {!isOlympiad && (
                  <Box sx={{
                    position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
                    bgcolor: overlayColor, color: "white", display: "flex", justifyContent: "center",
                    alignItems: "center", fontSize: "1.2rem", fontWeight: "bold",
                    textTransform: "uppercase", animation: "fadeText 1s infinite",
                    "@keyframes fadeText": { "0%,100%": { opacity: 1 }, "50%": { opacity: 0.6 } },
                  }}>
                    {loadingText}
                  </Box>
                )}
                {isOlympiad && (
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 2 }}>
                      {new Date(post.date).toLocaleDateString()} • {post.readTime}
                    </Typography>
                    <Typography gutterBottom variant="h5" sx={{
                      mb: 2, color: "primary.main", fontWeight: 700, cursor: "pointer",
                      "&:hover": { color: "secondary.main" },
                    }} onClick={() => handleOpenDialog(post)}>
                      {post.title}
                    </Typography>
                    <Typography paragraph sx={{ mb: 3, color: "text.secondary", lineHeight: 1.6 }}>
                      {post.excerpt}
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton size="small" onClick={() => handleLike(post.id)} sx={{ color: "primary.main" }}>
                          <ThumbUp fontSize="small" />
                          <Typography variant="body2" sx={{ ml: 0.5 }}>{likes[post.id] || 0}</Typography>
                        </IconButton>
                        <IconButton size="small" onClick={() => handleOpenDialog(post)} sx={{ color: "primary.main" }}>
                          <Comment fontSize="small" />
                          <Typography variant="body2" sx={{ ml: 0.5 }}>{(comments[post.id] || []).length}</Typography>
                        </IconButton>
                      </Box>
                      <Button variant="contained" color="primary" size="small" onClick={() => handleOpenDialog(post)}
                        sx={{ borderRadius: 2, px: 3, fontWeight: "bold" }}>Read More</Button>
                    </Box>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </Box>

        {/* Dialog (Olympiad) */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle sx={{
            bgcolor: "primary.main", color: "white", display: "flex",
            justifyContent: "space-between", alignItems: "center",
          }}>
            <Typography variant="h5" fontWeight="bold">{selectedPost?.title}</Typography>
            <IconButton onClick={handleCloseDialog} sx={{ color: "white" }}><Close /></IconButton>
          </DialogTitle>
          <DialogContent sx={{ p: 4 }}>
            {selectedPost && (
              <>
                <CardMedia component="img" height="300" src={selectedPost.image}
                  alt={selectedPost.title} sx={{ borderRadius: 2, mb: 3 }} />
                {/* Olympiad full details */}
                <Typography variant="h6" sx={{ color: "primary.main", mt: 3 }}>Event Details</Typography>
                <Typography variant="body1" paragraph>
                  Primary schools are invited to represent their institutions at the inaugural Gold Stream Olympiad,
                  taking place from October 27th to November 8th, 2025 across multiple locations:
                </Typography>
                <Typography variant="h6" sx={{ color: "primary.main", mt: 3 }}>Locations</Typography>
                <ul>
                  <li>Bayelsa - Swimming events</li>
                  <li>Delta - Swimming events</li>
                  <li>Lagos - All other events</li>
                </ul>
                <Typography variant="h6" sx={{ color: "primary.main", mt: 3 }}>Sports Events</Typography>
                <ul>
                  <li>Track & Field</li>
                  <li>Table Tennis</li>
                  <li>Lawn Tennis</li>
                  <li>Football</li>
                  <li>Basketball</li>
                  <li>Swimming</li>
                </ul>
                <Typography variant="h6" sx={{ color: "primary.main", mt: 3 }}>Arts Events</Typography>
                <ul>
                  <li>Singing (5 Categories)</li>
                  <li>Dancing</li>
                  <li>Poetry</li>
                  <li>MC/DJ Skills</li>
                  <li>Instrumental Music</li>
                </ul>
                <Typography variant="h6" sx={{ color: "primary.main", mt: 3 }}>Grant Opportunities</Typography>
                <Typography variant="body1" paragraph>
                  Winning schools will receive special grant opportunities to support their sports and arts programs.
                </Typography>
                <Typography variant="h6" sx={{ color: "primary.main", mt: 3 }}>Registration</Typography>
                <Typography variant="body1" paragraph>
                  Registration is closing soon! Contact us at 09013612454 to register your school.
                </Typography>
                <Typography variant="h6" sx={{ color: "primary.main", mt: 3 }}>Powered By</Typography>
                <Typography variant="body1" paragraph>
                  DIMENSIONAL FRONTIERS & EXPOSURES LTD<br />
                  CIO Charles Edelt<br />
                  S11, Second Floor, Ozde Plaza, 22 Osolo Way<br />
                  Off MM International Airport Road, Ajao Estate, Lagos<br />
                  Tel: +234 (0)9160009555, +234 (0)9013612454<br />
                  Email: info@goldstreamacademy.com<br />
                  Website: www.goldstreamacademy.com
                </Typography>

                {/* Share buttons */}
                <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
                  <IconButton onClick={() => handleShare(selectedPost.id, "facebook")}><Facebook color="primary" /></IconButton>
                  <IconButton onClick={() => handleShare(selectedPost.id, "twitter")}><Twitter color="primary" /></IconButton>
                  <IconButton onClick={() => handleShare(selectedPost.id, "linkedin")}><LinkedIn color="primary" /></IconButton>
                </Box>

                {/* Comments */}
                <Typography variant="h6" gutterBottom>
                  Comments ({(comments[selectedPost.id] || []).length})
                </Typography>
                {(comments[selectedPost.id] || []).map((cmt) => (
                  <Box key={cmt.id} sx={{ display: "flex", gap: 2, mb: 2, p: 2, bgcolor: "rgba(0,0,0,0.02)", borderRadius: 2 }}>
                    <Avatar src={cmt.avatar} />
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">{cmt.user}</Typography>
                      <Typography variant="body2">{cmt.text}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(cmt.created_at).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                ))}
                <Box sx={{ mt: 3 }}>
                  <TextField fullWidth multiline rows={3} label="Add a comment" value={comment}
                    onChange={(e) => setComment(e.target.value)} variant="outlined" sx={{ mb: 2 }} />
                  <Button variant="contained" color="primary" onClick={() => handleCommentSubmit(selectedPost.id)}>
                    Post Comment
                  </Button>
                </Box>
              </>
            )}
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
};

export default BlogSection;

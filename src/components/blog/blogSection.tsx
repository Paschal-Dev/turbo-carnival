import { useState } from 'react';
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
} from '@mui/material';
import { SportsSoccer, School, Event, Groups, MenuBook, ThumbUp, Share } from '@mui/icons-material';
import { posts } from '../../data/posts';

const BlogSection = () => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.only('xs'));
  const [postList] = useState(posts);
  const [comment, setComment] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [comments, setComments] = useState<Record<string, any[]>>({});

  const handleCommentSubmit = (postId: string) => {
    if (!comment.trim()) return;
    const newComment = {
      id: `${postId}-${Date.now()}`,
      text: comment,
      user: 'Anonymous',
      created_at: new Date().toISOString(),
    };
    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment],
    }));
    setComment('');
    // Persist comments to localStorage
    localStorage.setItem(
      'comments',
      JSON.stringify({ ...comments, [postId]: [...(comments[postId] || []), newComment] }),
    );
  };

  const handleLike = (postId: string) => {
    console.log(`Liked post ${postId}`);
  };

  const handleShare = (postId: string) => {
    console.log(`Shared post ${postId}`);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Sports':
        return <SportsSoccer fontSize="small" />;
      case 'Academics':
        return <School fontSize="small" />;
      case 'Events':
        return <Event fontSize="small" />;
      case 'Student Life':
        return <Groups fontSize="small" />;
      default:
        return <MenuBook fontSize="small" />;
    }
  };

  return (
    <Box sx={{ py: mobile ? 4 : 8, bgcolor: 'background.default' }} id="blog">
      <Container>
        <Typography
          variant="h2"
          align="center"
          mt={mobile ? 4 : 4}
          gutterBottom
          sx={{
            mb: mobile ? 4 : 6,
            color: 'primary.main',
            fontSize: mobile ? '1.5rem' : '2.5rem',
          }}
        >
          School News & Updates
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr', // 1 column on mobile
              md: 'repeat(2, 1fr)', // 2 columns on medium
              lg: 'repeat(3, 1fr)', // 3 columns on large
            },
            gap: mobile ? 2 : 4, // Replaces Grid's spacing
          }}
        >
          {postList.map((post) => (
            <Box key={post.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: post.featured ? '2px solid' : '1px solid',
                  borderColor: post.featured ? 'primary.main' : 'primary.light',
                  boxShadow: post.featured ? 3 : 1,
                  transition: 'all 0.3s ease',
                  '&:hover': { transform: 'translateY(-5px)', boxShadow: 4 },
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    src={post.image}
                    alt={post.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  {post.featured && (
                    <Chip
                      label="Featured"
                      color="primary"
                      size="small"
                      sx={{ position: 'absolute', top: 10, right: 10, fontWeight: 'bold' }}
                    />
                  )}
                </Box>
                <CardContent sx={{ flexGrow: 1, p: mobile ? 2 : 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: mobile ? 1 : 2 }}>
                    <Chip
                      icon={getCategoryIcon(post.category)}
                      label={post.category}
                      size="small"
                      variant="outlined"
                      sx={{ mr: 1, borderColor: 'secondary.main' }}
                    />
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontSize: mobile ? '0.8rem' : '0.9rem' }}
                    >
                      {post.readTime}
                    </Typography>
                  </Box>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    sx={{
                      mb: mobile ? 1 : 2,
                      color: 'primary.main',
                      fontSize: mobile ? '1.2rem' : '1.5rem',
                    }}
                  >
                    {post.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: mobile ? 1 : 2, fontSize: mobile ? '0.9rem' : '1rem' }}
                  >
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Typography>
                  <Typography
                    paragraph
                    sx={{ mb: mobile ? 1 : 3, color: 'text.primary', fontSize: mobile ? '0.9rem' : '1rem' }}
                  >
                    {post.excerpt}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: mobile ? 1 : 2 }}>
                    <Button
                      startIcon={<ThumbUp />}
                      size="small"
                      onClick={() => handleLike(post.id)}
                      sx={{ color: 'primary.main', fontSize: mobile ? '0.8rem' : '0.9rem' }}
                    >
                      Like
                    </Button>
                    <Button
                      startIcon={<Share />}
                      size="small"
                      onClick={() => handleShare(post.id)}
                      sx={{ color: 'primary.main', fontSize: mobile ? '0.8rem' : '0.9rem' }}
                    >
                      Share
                    </Button>
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" sx={{ mb: 1, fontSize: mobile ? '1rem' : '1.2rem' }}>
                      Comments
                    </Typography>
                    {comments[post.id]?.map((cmt) => (
                      <Box key={cmt.id} sx={{ mb: 1, p: 1, bgcolor: 'background.paper', borderRadius: 1 }}>
                        <Typography variant="body2" sx={{ fontSize: mobile ? '0.8rem' : '0.9rem' }}>
                          {cmt.text} - <em>{cmt.user}</em>
                        </Typography>
                      </Box>
                    ))}
                    <TextField
                      fullWidth
                      label="Add a comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      size="small"
                      sx={{ mt: 1 }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleCommentSubmit(post.id)}
                      sx={{ mt: 1, bgcolor: 'secondary.main', fontSize: mobile ? '0.8rem' : '0.9rem' }}
                    >
                      Post Comment
                    </Button>
                  </Box>
                </CardContent>
                <Box sx={{ p: mobile ? 1 : 2, pt: 0 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{
                      textTransform: 'none',
                      fontWeight: 'bold',
                      bgcolor: 'secondary.main',
                      fontSize: mobile ? '0.8rem' : '0.9rem',
                    }}
                  >
                    Read Full Story
                  </Button>
                </Box>
              </Card>
            </Box>
          ))}
        </Box>
        <Box sx={{ textAlign: 'center', mt: mobile ? 4 : 6 }}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            sx={{
              px: 4,
              fontWeight: 'bold',
              borderColor: 'secondary.main',
              fontSize: mobile ? '0.9rem' : '1rem',
            }}
          >
            View All News Articles
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default BlogSection;
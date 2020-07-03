import user from "./user";
import performer from "./performer";
import devTool from "./devTool";
import recommendations from "./recommendations";
import favorites from "./favorites";
import theme from "./theme";

const reducers = {
  user: user.reducer,
  performer: performer.reducer,
  toolsOpen: devTool.reducer,
  recommendations: recommendations.reducer,
  favorites: favorites.reducer,
  theme: theme.reducer,
};

export default reducers;

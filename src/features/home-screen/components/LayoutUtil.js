import { LayoutProvider } from 'recyclerlistview';
import globalStyles from '../../../globalStyles';

export class LayoutUtil {
    static getLayoutProvider() {
                return new LayoutProvider(
                    () => {
                        return 'FULL';
                    },
                    (type, dim) => {
                        const columnWidth = globalStyles.screenWidth;
                        switch (type) {
                            case 'FULL':
                                    dim.width = columnWidth;
                                    dim.height = 250;
                                break;
                            default:
                                dim.width = 0;
                                dim.height = 0;
                        }
                    }
                );
    }
}

import { DEFAULT_THEME } from './data/default-theme';
import { GroupedNamedColors } from './models/grouped-color.model';
import { NamedColor } from './models/named-color.model';

export class StyleUtils {
    static setCSSVariablesFromGroupedColors(
        groupedColorsList: Array<GroupedNamedColors> = DEFAULT_THEME.theme1!
    ): void {
        // Prepare class
        this.createCssClasses(groupedColorsList);
        // get all color groups in the array
        groupedColorsList.forEach((groupedColors: GroupedNamedColors) => {
            // get all group names
            Object.keys(groupedColors).forEach((groupName: string) => {
                // set variable for each color in the group
                groupedColors[groupName]?.forEach((namedColor: NamedColor | any) => {
                    // Normalize and convert to kebab-case
                    const grouping: string = groupName
                        .toLocaleLowerCase()
                        .replace('_', '-');
                    const name: string = namedColor.name
                        .toLocaleLowerCase()
                        .replace('_', '-');
                    const on: string = namedColor.on
                        .toLocaleLowerCase()
                        .replace('_', '-');
                    document.documentElement.style.setProperty(
                        `--${grouping}-${name}`,
                        `${namedColor.color}`
                    );
                    if (on) {
                        document.documentElement.style.setProperty(
                            `--${grouping}-on-${name}`,
                            `${namedColor.on}`
                        );
                    }
                });
            });
        });


    }
    static createCssClasses(themeData: Array<GroupedNamedColors>) {
        // Create a <style> element
        const style = document.createElement('style');

        let cssContent = '';

        // Iterate over the theme categories (e.g., primary, secondary, background, surface)
        for (const [category, colors] of Object.entries(themeData[0])) {
            colors.forEach((colorData) => {
                const { name, color, on } = colorData;

                // Generate class name, e.g., `.primary_base` or `.background_light`
                const className = `${category}_${name}`;
                // Create CSS rule for the class
                cssContent += `
        .${className} {
        background-color: ${color}  !important;
        }
        `;

                // Generate class name, e.g., `.primary_on_base` or `.background_on_light`
                const textColorName = `${category}_on_${name}`;
                // Create CSS rule for the class
                cssContent += `
                .${textColorName} {
                color: ${on} !important;
                }
                `;
                // Generate text class name, e.g., `.text_primary_base` or `.background_light`
                const txtClassName = `text_${category}_${name}`;
                // Create CSS rule for the class
                cssContent += `
                .${txtClassName} {
                color: ${color};
                }
                `;

            });
        }

        // Append CSS content to the <style> element
        style.appendChild(document.createTextNode(cssContent));
        // Append <style> to the document head
        document.head.appendChild(style);
    }
}
